const { TextContent, FileContent } = require('@zenvia/sdk');
const recognizeMusic = require('../services/recognizeMusic');
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
      
      let chat = await this.chatController.getChatOfNumber(messageEvent.message.from);

      if(!chat){
        chat = await this.chatController.saveChat({
          phoneNumber: messageEvent.message.from,
          name: messageEvent.message.visitor.name,
          interactions: 0,
          musics:[]
        });
      }

      chat.interactions++;
      
      let content = [
        new TextContent(`Olá ${chat.name}, vocês já enviou ${chat.interactions} áudios!`)
      ];
      
      if (messageEvent.message.contents[0].type === 'file' && messageEvent.message.contents[0].fileMimeType.includes('audio')) {
        const music = await recognizeMusic(messageEvent.message.contents[0].fileUrl);
  
        if (music) {
          let text = '';
          if (music.artist) {
            text = `${text}Artista: *${music.artist}*\n`;
          }
          if (music.title) {
            text = `${text}Título: *${music.title}*\n`;
          }
          if (music.album) {
            text = `${text}Álbum: *${music.album}*\n`;
          }
          content = [new TextContent(text)];
          if (music.deezer && music.deezer.picture) {
            content.push(new FileContent(music.deezer.picture, 'image/jpeg'));
          }
          if (music.deezer && music.deezer.preview) {
            content.push(new FileContent(music.deezer.preview, 'audio/mpeg'));
          }
        } else {
          content = [new TextContent('Não foi possível identificar a música do áudio.')];
        }
      }

      await this.channel.sendMessage(
        messageEvent.message.to, 
        messageEvent.message.from, 
        ...content
      );


      await this.chatController.update(chat);  

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MessageController;