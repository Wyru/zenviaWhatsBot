const { TextContent } = require('@zenvia/sdk');
const ChatController = require('./chat.controller');

class MessageController {
  /**
   * @param  {import("@zenvia/sdk").IChannel} channel
   */
  constructor (channel, database){
    this.channel = channel;
    this.database = database;
    this.chatController = new ChatController(database.chats);
  }

  /**
   * @param  {import("@zenvia/sdk").IMessageEvent} messageEvent
   */
  MessageEventHandler = async (messageEvent) => {
    try {
      console.log('Message event:', messageEvent);

      let chat = await this.chatController.getChatOfNumber(messageEvent.message.from);

      if(!chat){
        chat = await this.chatController.saveChat({
          phoneNumber: messageEvent.message.from,
          name: messageEvent.message.visitor.name,
          interactions: 0
        });
      }

      chat.interactions++;

      const content = new TextContent(`Olá ${chat.name}, você já enviou mensagem ${chat.interactions}`);

      await this.channel.sendMessage(
        messageEvent.message.to, 
        messageEvent.message.from, 
        content
      );


      await this.chatController.update(chat);  

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MessageController;