const Discord = require('discord.js');
const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Initialize Discord bot
const client = new Discord.Client();
const discordToken = 'YOUR_DISCORD_BOT_TOKEN';
const channelId = 'YOUR_DISCORD_CHANNEL_ID';

let lastProcessedKey = null;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Check for new posts every minute
  setInterval(() => {
    const dbRef = database.ref('posts');
    dbRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        if (key !== lastProcessedKey) {
          const postData = childSnapshot.val();
          const postMessage = `New post: ${postData.title} - ${postData.content}`;
          const channel = client.channels.cache.get(channelId);
          if (channel) {
            channel.send(postMessage);
          } else {
            console.error('Discord channel not found!');
          }
          lastProcessedKey = key;
        }
      });
    });
  }, 60000); // Interval set to 1 minute (60000 milliseconds)
});

client.login(discordToken);