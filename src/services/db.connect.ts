import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnect = () => {
  const user = process.env.USER_DB;
  const passwd = process.env.PASS_DB;
  const dataBase = process.env.DB_NAME;
  const uri = `mongodb+srv://${user}:${passwd}@iph.e3wxapv.mongodb.net/${dataBase}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
