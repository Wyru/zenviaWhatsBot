import { IChannel, IMessageEvent } from "@zenvia/sdk";
import DatabaseConnection from "../database/databaseConnection";
import ChatService from "../services/chat.service";

class MessageController {

  channel: IChannel;
  database: DatabaseConnection;
  chatService: ChatService;


  constructor(channel: IChannel, database: DatabaseConnection) {
    this.channel = channel;
    this.database = database;

    this.chatService = new ChatService(database);
  }


  MessageEventHandler = async (messageEvent: IMessageEvent) => {
    try {

      const name = (messageEvent.message as any).visitor.name;
      const phoneNumber = messageEvent.message.from;
      const messageContent = messageEvent.message.contents[0];

      const contents = await this.chatService.handleMessage(phoneNumber, name, messageContent);


      this.channel.sendMessage(
        messageEvent.message.to,
        messageEvent.message.from,
        ...contents
      );

    } catch (error) {
      console.log(error);
    }
  }
}

export default MessageController;