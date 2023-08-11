const { create } = require('@open-wa/wa-automate');
const axios = require('axios');
const covalentApiKey = 'cqt_rQbHXWTyYWDxtddykWMkJ99wxCxQ'; // Covalent API Key
async function getChatGptResponse(userInput) {
  const chatGptApiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = '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';

  try {
    const response = await axios.post(chatGptApiUrl, {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
      max_tokens: 3000,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error getting ChatGPT response:', error);
    console.log(error.response.data);
    return 'Maaf, terjadi kesalahan dalam memproses permintaan Anda.';
  }
}
// Object to store user chat activity
const userActivity = {};

create().then(client => start(client));

async function start(client) {
  client.onMessage(async message => {
    const { body, chat, from, sender } = message;

    // Check if sender exists before proceeding
    if (!sender) {
      console.error('Sender object is undefined');
      return;
    }

    // Increment user's chat activity count
    if (sender.id) {
      if (userActivity[sender.id]) {
        userActivity[sender.id]++;
      } else {
        userActivity[sender.id] = 1;
      }
    }

    function isAllowedUser(userId) {
      const allowedUsers = ['6283168231623@c.us', '6283168231623@c.us'];
      return allowedUsers.includes(userId);
    }

    if (body.startsWith('!tagall')) {
      if (!isGroupMsg) return urbae.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
					if (!isGroupAdmins & !isOwnerB) return urbae.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
					const textInfo = q
					const namagcnih = name
					const memchu = chat.groupMetadata.participants.length
					const groupMem = await urbae.getGroupMembers(groupId)
					let hehex = `Name Group : *${namagcnih}*\n\nTotal Members : *${memchu}*\n\n╔══✪〘 Mention All 〙✪══\n╠\n`
					for (let i = 0; i < groupMem.length; i++) {
						hehex += `╠➥`
						hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
					}
					hehex += '╠\n╚═〘 *B O T  C R Y P T O* 〙'
					await urbae.sendTextWithMentions(from, `Info dari : @${sender.id.replace(/@c.us/g, '')}\n\n` + textInfo + '\n\n' + hehex)
					break
    }
   
    if (body === 'jepe' || body.startsWith('!hibot ')) {
  const userInput = body.slice(body.indexOf(' ') + 1).trim(); // Menghapus kata kunci perintah dari input pengguna dan menghapus spasi ekstra
  if (!userInput) {
    await client.sendText(from, 'Silakan berikan pertanyaan atau pernyataan Anda setelah !hibot');
    return;
  }

  // Jika perintah adalah 'jepe', Anda bisa menangani secara khusus sebagai perintah, atau Anda bisa mengabaikannya jika Anda hanya ingin memproses input sebagai pertanyaan untuk ChatGPT.

  try {
    // Mendapatkan respons dari ChatGPT API berdasarkan input pengguna
    const chatGptResponse = await getChatGptResponse(userInput);

    // Mengambil pushname (display name) dari user yang mengirim pesan
    const pushname = sender.pushname || 'Unknown';

    // Mencantumkan tag username dalam respon
    const responseWithTag = `@${pushname}, ${chatGptResponse}`;

    // Mengirimkan respons ChatGPT beserta tag username kembali ke pengguna
    await client.sendText(from, responseWithTag);
  } catch (error) {
    console.error('Error processing chat:', error);
    await client.sendText(from, 'Maaf, terjadi kesalahan dalam memproses permintaan Anda.');
  }
}

    if (body.startsWith('!search')) {
      const [command, coin] = body.split(' ');
      if (!coin) {
        await client.sendText(from, 'Please provide a coin symbol. For example, !s BTC');
        return;
      }

      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const coins = response.data;
        const matchedCoins = coins.filter(c => c.symbol.toLowerCase() === coin.toLowerCase());
        if (matchedCoins.length > 0) {
          const coinID = matchedCoins[0].id;
          await client.sendText(from, `The ID of ${coin.toUpperCase()} is ${coinID}`);
        } else {
          await client.sendText(from, 'Coin not found');
        }
      } catch (error) {
        console.error('Error retrieving coin ID:', error);
        await client.sendText(from, 'Error retrieving coin ID. Please try again later.');
      }
    }

    if (body.startsWith('!price')) {
      const [command, coin] = body.split(' ');
      if (!coin) {
        await client.sendText(from, 'Please provide a coin symbol. For example, !p BTC');
        return;
      }

      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd,idr`);
        const data = response.data;
        if (data[coin]) {
          const priceUSD = data[coin].usd ? data[coin].usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
          const priceIDR = data[coin].idr ? data[coin].idr.toLocaleString('id-ID') : 'N/A';
          await client.sendText(from, `The current price of ${coin.toUpperCase()} is $${priceUSD} (IDR ${priceIDR})`);
        } else {
          await client.sendText(from, 'Coin not found');
        }
      } catch (error) {
        console.error('Error retrieving price:', error);
        await client.sendText(from, 'Error retrieving price. Please try again later.');
      }
    }

    if (body.startsWith('!convert')) {
      const [command, amount, coin] = body.split(' ');
      if (!amount || !coin) {
        await client.sendText(from, 'Please provide the amount and coin symbol. For example, !c 20 BTC');
        return;
      }

      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd,idr`);
        const data = response.data;
        if (data[coin]) {
          const priceUSD = data[coin].usd;
          const priceIDR = data[coin].idr;
          if (priceUSD && priceIDR) {
            const convertedUSD = parseFloat(amount) * priceUSD;
            const convertedIDR = parseFloat(amount) * priceIDR;
            await client.sendText(from, `${amount} ${coin.toUpperCase()} is $${convertedUSD.toFixed(2)} (IDR ${convertedIDR.toLocaleString('id-ID')})`);
          } else {
            await client.sendText(from, 'Price data not available for the specified coin');
          }
        } else {
          await client.sendText(from, 'Coin not found');
        }
      } catch (error) {
        console.error('Error converting amount:', error);
        await client.sendText(from, 'Error converting amount. Please try again later.');
      }
    }

    if (body.startsWith('!saldo')) {
      const [command, address] = body.split(' ');
      if (!address) {
        await client.sendText(from, 'Please provide an address. For example, !b 0x...');
        return;
      }

      // Check balance for different networks (ETH, BNB, Arbitrum, Optimism, Polygon)
      try {
        const networks = ['eth-mainnet', 'bsc-mainnet', 'arbitrum-mainnet', 'optimism-mainnet', 'matic-mainnet'];
        let balanceMessage = `Address: ${address}\n\n`;

        for (let network of networks) {
          const response = await axios.get(`https://api.covalenthq.com/v1/${network}/address/${address}/balances_v2/`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${covalentApiKey}` // Include Covalent API key in headers
            }
          });

          const data = response.data;

          if (data && data.data && data.data.items) {
            const items = data.data.items;
            if (items.length > 0) {
              balanceMessage += `${network.toUpperCase()}:\n`;
              for (let item of items) {
                const tokenName = item.contract_name;
                const tokenSymbol = item.contract_ticker_symbol;
                const balance = item.balance / 10 ** item.contract_decimals;
                balanceMessage += `${tokenSymbol}: ${balance}\n`;
              }
              balanceMessage += '\n';
            } else {
              balanceMessage += `${network.toUpperCase()}: No balances found\n\n`;
            }
          } else {
            balanceMessage += `${network.toUpperCase()}: Error retrieving balances\n\n`;
          }
        }

        await client.sendText(from, balanceMessage);
      } catch (error) {
        console.error('Error retrieving balances:', error);
        await client.sendText(from, 'Error retrieving balances. Please try again later.');
      }
    }

    if (body.startsWith('!rank')) {
      if (isAllowedUser(sender.id)) {
        const leaderboard = getTopUsers();
        let leaderboardMessage = 'Leaderboard: need 1000 chat\n\n';
        for (let i = 0; i < leaderboard.length; i++) {
          const { userId, activity } = leaderboard[i];
          const userProfile = await client.getContact(userId);
          const username = userProfile.pushname || 'Unknown';
          leaderboardMessage += `${i + 1}. User: *@${username}*  Messages: ${activity}\n`;
        }
        await client.sendText(from, leaderboardMessage);
      } else {
        await client.sendText(from, 'Sorry, only admins can use this command.');
      }
    }
  });
}

// Function to get the top 10 users based on chat activity
function getTopUsers() {
  const sortedUsers = Object.entries(userActivity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([userId, activity]) => ({ userId, activity }));

  return sortedUsers;
}
