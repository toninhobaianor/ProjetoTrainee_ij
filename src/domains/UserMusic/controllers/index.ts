import { Router, Request, Response, NextFunction } from "express";
import UserMusicService from "../service/UserMusicService";
import { statusCodes } from "../../../../utils/constants/statusCodes";
import { verifyJWT, checkRole } from "../../../middlewares/auth";

const router = Router();

router.post("/listen/:id", verifyJWT, checkRole(["admin", "user"]), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id }: { id: number } = req.body;
		if (isNaN(id)) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "ID de música inválido fornecido." });
		}
		const userId = Number(req.params.id);
		if (isNaN(userId)) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "ID de usuário inválido fornecido." });
		}
		const usermusic = await UserMusicService.createUserMusic(id,userId);
		if (usermusic) {
			res.status(statusCodes.SUCCESS).json(usermusic);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Usuário ou música não encontrado." });
		}
	}catch (error){
		next(error);
	}
});

router.get("/musics/:id", verifyJWT, checkRole(["admin", "user"]), async (req: Request, res: Response, next: NextFunction) => {
	try{
		const musicId = Number(req.params.id);
		if (isNaN(musicId)) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "ID inválido fornecido." });
		}
		const usermusic = await UserMusicService.readUserMusics(musicId);
		if (usermusic) {
			res.status(statusCodes.SUCCESS).json(usermusic);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Usuário ou música não encontrado." });
		}
	}catch (error){
		next(error);
	}
});

router.delete("/unlisten/:id", verifyJWT, checkRole(["admin", "user"]), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id }: { id: number } = req.body;
		if (isNaN(id)) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "ID de música inválido fornecido." });
		}
		const userId = Number(req.params.id);
		if (isNaN(userId)) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "ID de usuário inválido fornecido." });
		}
		const usermusic = await UserMusicService.deleteUserMusic(id,userId);
		if (usermusic != null) {
			res.status(statusCodes.NOT_FOUND).json({ error: "Não foi possível deletar a relação. Usuário ou música não encontrado." });
		} else {
			res.status(statusCodes.SUCCESS).json(usermusic);
		}
	}catch (error){
		next(error);
	}
});

export default router;
