import { User } from "@prisma/client";
import { Music } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";
import UserMusicService from "../service/UserMusicService";

const router = Router();

router.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
        const music: Music = req.body;
		const usermusic = await UserMusicService.createUserMusic(music,Number(req.params.id));
		res.json(usermusic);
	} catch (error) {
		next(error);
	}
});

router.delete("/delete/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
        const music: Music = req.body;
		const usermusic = await UserMusicService.deleteUserMusic(music,Number(req.params.id));
		res.json(usermusic);
	} catch (error) {
		next(error);
	}
});

export default router;
