const dotenv = require("dotenv");
const { Client, WebhookController } = require('@zenvia/sdk');
const { MessageController } = require("./controllers/message.controller");


dotenv.config();


const client = new Client(process.env.ZENVIA_TOKEN);

const whatsapp = client.getChannel('whatsapp');

const messageController = new MessageController(whatsapp);

const webhook = new WebhookController({
  port: process.env.PORT,
  messageEventHandler: messageController.MessageEventHandler,
  channel: 'whatsapp',
});

webhook.on('listening', () => {
  console.log('Webhook is listening');
});

webhook.init();