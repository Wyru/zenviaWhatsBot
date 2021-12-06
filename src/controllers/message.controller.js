const { TextContent } = require('@zenvia/sdk');

class MessageController {
  /**
   * @param  {import("@zenvia/sdk").IChannel} channel
   */
  constructor (channel){
    this.channel = channel;
  }

  /**
   * @param  {import("@zenvia/sdk").IMessageEvent} messageEvent
   */
  MessageEventHandler = async (messageEvent) => {
    try {
      console.log('Message event:', messageEvent);

      const content = new TextContent('it\'s me');
      console.log("🐛 ~ file: message.controller.js ~ line 21 ~ MessageController ~ MessageEventHandler ~ this.channel", this)

      const response = await this.channel.sendMessage(
        messageEvent.message.to, 
        messageEvent.message.from, 
        content
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {MessageController};