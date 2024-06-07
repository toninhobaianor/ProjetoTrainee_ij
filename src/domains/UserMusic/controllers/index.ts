import { Router, Request, Response, NextFunction } from "express";
import UserMusicService from "../service/UserMusicService";

const router = Router();

router.post("/listen/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id }: { id: number } = req.body;
		const usermusic = await UserMusicService.createUserMusic(id,Number(req.params.id));
		res.json(usermusic);
	}catch (error){
		next(error);
	}
});

router.get("/musics/:id", async (req: Request, res: Response, next: NextFunction) => {
	try{
		const usermusic = await UserMusicService.readUserMusics(Number(req.params.id));
		res.json(usermusic);
	}catch (error){
		next(error);
	}
});

router.delete("/unlisten/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id }: { id: number } = req.body;
		const usermusic = await UserMusicService.deleteUserMusic(id,Number(req.params.id));
		res.json(usermusic);
	}catch (error){
		next(error);
	}
});

export default router;
