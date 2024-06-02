import { Author } from '@prisma/client';
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import MusicRouter from "../src/domains/Music/controllers/index";
import UserRouter from"../src/domains/User/controllers/index";
import AuthorRouter from "../src/domains/Author/controllers/index";
import UserMusicRouter from "../src/domains/UserMusic/controllers/index";


dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
	credentials: true,
	origin: process.env.APP_URL
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
	extended: true,
}));
// users
app.use("/api/musics", MusicRouter);
app.use("/api/users", UserRouter);
app.use("/api/artists", AuthorRouter);
app.use("/api/usermusics", UserMusicRouter);