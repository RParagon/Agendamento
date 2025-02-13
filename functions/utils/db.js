// functions/utils/db.js
const mongoose = require('mongoose');

let isConnected = false;

async function connectToDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Conectado ao MongoDB!');
  }
}

module.exports = { connectToDB };
