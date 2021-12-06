const monk = require('monk');

class DatabaseConnection {
  constructor(MONGO_DB_URI){
    this.db = monk(MONGO_DB_URI);
    this.chats =  this.db.get("chats");
  }
}


module.exports = DatabaseConnection;