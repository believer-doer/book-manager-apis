import {connect} from 'mongoose';

export default class Mongo {
  public static async connect() {
    const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
    const options = {
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
    };
    await connect(uri, options);
  }
}
