const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor, defina a variável MONGODB_URI no ambiente.');
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

module.exports = clientPromise;
