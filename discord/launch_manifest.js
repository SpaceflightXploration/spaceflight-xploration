const Discord = require('discord.js');
const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWnK5lzEFWY4qf74hGssiv_4_UC4IMocM",
  authDomain: "sfs-bp-store.firebaseapp.com",
  databaseURL: "https://sfs-bp-store-default-rtdb.firebaseio.com",
  projectId: "sfs-bp-store",
  storageBucket: "sfs-bp-store.appspot.com",
  messagingSenderId: "1026737660232",
  appId: "1:1026737660232:web:93eb81c99f5bea10fa937d",
  measurementId: "G-H6449LTSF0"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Initialize Discord bot
const client = new Discord.Client();
const discordToken = 'OTU1MzY0NDgyNzE5Mjg1MjU5.GxM5up.wnf02ZZl355K7W1rBR_y-yt118KpxlL-txjYVE';
const channelId = '1194221384021323857';

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