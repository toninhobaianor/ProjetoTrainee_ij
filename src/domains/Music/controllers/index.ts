import { Router, Request, Response, NextFunction } from "express";
import MusicService from "../service/MusicService";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const music = await MusicService.readAll();
		res.json(music);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) =>{
	try{
		const music = await MusicService.readById(Number(req.params.id));
		res.json(music);
	}catch (error) {
		next(error);
	}
});

export default router;