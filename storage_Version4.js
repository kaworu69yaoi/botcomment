const { MongoClient } = require('mongodb');
const { MONGODB_URI } = require('./config');

const client = new MongoClient(MONGODB_URI);
let collection;

async function init() {
  await client.connect();
  const db = client.db('telegramBot');
  collection = db.collection('processedMessages');
}

async function isProcessed(msgId) {
  const doc = await collection.findOne({ msgId });
  return !!doc;
}

async function markAsProcessed(msgId) {
  await collection.insertOne({ msgId });
}

module.exports = { init, isProcessed, markAsProcessed };