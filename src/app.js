const dotenv = require("dotenv");

const { Client, WebhookController } = require('@zenvia/sdk');
const MessageController  = require("./controllers/message.controller");
const DatabaseConnection = require("./db/databaseConnection");

dotenv.config();

const ZENVIA_TOKEN = process.env.ZENVIA_TOKEN;
const client = new Client(ZENVIA_TOKEN);
const whatsapp = client.getChannel('whatsapp');

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const database = new DatabaseConnection(MONGO_DB_URI);

const messageController = new MessageController(whatsapp, database);

const webhook = new WebhookController({
  port: process.env.PORT,
  messageEventHandler: messageController.MessageEventHandler,
  channel: 'whatsapp',
});

webhook.on('listening', () => {
  console.log('Webhook is listening');
});

webhook.init();