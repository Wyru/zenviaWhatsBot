import Config from './config/config';
import AppController from './controllers/app.controller';
import MessageController from './controllers/message.controller';
import DatabaseConnection from "./database/databaseConnection";

const config = Config.getConfig();

const databaseConnection = new DatabaseConnection(config.mongoUri);

const appController = new AppController(config);

const messageController = new MessageController(appController.channel, databaseConnection);

appController.startZenviaWebhook(messageController.MessageEventHandler);