import { User } from "@prisma/client";
import { Music } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";
import UserMusicService from "../service/UserMusicService";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: User = req.body;
        const music: Music = req.body;
		const usermusic = await UserMusicService.createUserMusic(music,user);
		res.json(usermusic);
	} catch (error) {
		next(error);
	}
});

router.delete("/delete", async (req: Request, res: Response, next: NextFunction) => {
	try {
        const user: User = req.body;
        const music: Music = req.body;
		const usermusic = await UserMusicService.deleteUserMusic(user,music);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

export default router;
