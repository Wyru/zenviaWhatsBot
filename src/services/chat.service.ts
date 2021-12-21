import { FileContent, IContent, TextContent } from "@zenvia/sdk";
import DatabaseConnection from "../database/databaseConnection";
import ChatModel from "../models/chat.model";

class ChatService {
  chatModel: ChatModel;

  constructor(database: DatabaseConnection) {
    this.chatModel = new ChatModel(database);
  }

  handleMessage = async (phoneNumber: string, name: string, messageContent: any): Promise<IContent[]> => {
    let chat = await this.chatModel.findByPhone(phoneNumber);

    if (!chat) {
      chat = await this.chatModel.saveChat({
        phoneNumber: phoneNumber,
        name: name,
        interactions: 0,
        musics: []
      });
    }

    chat.interactions++;

    let contents = [
      new TextContent(`Olá ${chat.name}, vocês já enviou ${chat.interactions} áudios!`)
    ];

    // if (messageContent.type === 'file' && messageContent.fileMimeType.includes('audio')) {
    //   const music = await recognizeMusic(messageContent.fileUrl);

    //   if (music) {
    //     let text = '';
    //     if (music.artist) {
    //       text = `${text}Artista: *${music.artist}*\n`;
    //     }
    //     if (music.title) {
    //       text = `${text}Título: *${music.title}*\n`;
    //     }
    //     if (music.album) {
    //       text = `${text}Álbum: *${music.album}*\n`;
    //     }
    //     contents = [new TextContent(text)];
    //     if (music.deezer && music.deezer.picture) {
    //       contents.push(new FileContent(music.deezer.picture, 'image/jpeg'));
    //     }
    //     if (music.deezer && music.deezer.preview) {
    //       contents.push(new FileContent(music.deezer.preview, 'audio/mpeg'));
    //     }
    //   } else {
    //     contents = [new TextContent('Não foi possível identificar a música do áudio.')];
    //   }
    // }

    await this.chatModel.update(chat);

    return contents;
  }

}

export default ChatService;