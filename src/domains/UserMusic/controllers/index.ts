import { Router, Request, Response, NextFunction } from "express";
import UserMusicService from "../service/UserMusicService";

const router = Router();

router.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id }: { id: number } = req.body;
		const usermusic = await UserMusicService.createUserMusic(id,Number(req.params.id));
		res.json(usermusic);
	} catch (error) {
		next(error);
	}
});

router.delete(":id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id }: { id: number } = req.body;
		const usermusic = await UserMusicService.deleteUserMusic(id,Number(req.params.id));
		res.json(usermusic);
	} catch (error) {
		next(error);
	}
});

export default router;
