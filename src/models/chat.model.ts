import { ICollection } from "monk";
import DatabaseConnection from "../database/databaseConnection";
import IChat from "../types/IChat";

class ChatModel {
  connection: DatabaseConnection;
  private collection: ICollection;

  constructor(databaseConnection: DatabaseConnection) {
    this.connection = databaseConnection;
    this.collection = databaseConnection.connection.get('chats');
  }


  findByPhone = async (phoneNumber: string) => {
    const chat = await this.collection.findOne({ phoneNumber });
    return chat;
  }

  saveChat = async (chatData: IChat) => {
    return await this.collection.insert(chatData);
  }

  update = async (chat: IChat) => {
    const filter = {
      phoneNumber: chat.phoneNumber
    }

    return this.collection.update(filter, { $set: chat });
  }
}


export default ChatModel;