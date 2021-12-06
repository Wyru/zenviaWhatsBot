
class ChatController {

  constructor(chatsCollection){
    this.chatsCollection = chatsCollection;
  }


  getChatOfNumber = async (phoneNumber) => {
    const chat = await this.chatsCollection.findOne({phoneNumber});
    return chat;
  }

  saveChat = async (chatData) => {
    return await this.chatsCollection.insert(chatData);
  }

  update = async (chat)=>{

    const filter = {
      phoneNumber: chat.phoneNumber
    }
    const options = {
      replaceOne: true
    };

    return this.chatsCollection.update(filter, chat, options)
  }

}


module.exports = ChatController;