import dotenv from 'dotenv';
dotenv.config();
import { mailScripter } from "mailscripter";

const mailer =new mailScripter(process.env.MAIL_URL);
export default mailer