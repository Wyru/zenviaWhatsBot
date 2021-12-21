import monk, { IMonkManager } from 'monk';

class DatabaseConnection {
  connection: IMonkManager;

  constructor(MONGO_DB_URI: string) {
    this.connection = monk(MONGO_DB_URI);
  }
}


export default DatabaseConnection;