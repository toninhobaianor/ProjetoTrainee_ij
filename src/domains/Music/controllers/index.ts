import { Router, Request, Response, NextFunction } from "express";
import MusicService from "../service/MusicService";
import {Music} from "@prisma/client";
import { statusCodes } from "../../../../utils/constants/statusCodes";
import { verifyJWT, checkRole } from "../../../middlewares/auth";

const router = Router();

//create a music (post)
router.post("/", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
	try{
		const body: Music = req.body;

		if (!body || !body.name || !body.authorId) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "Nome da música e ID do autor são obrigatórios." });
		}
		
		const music = await MusicService.createMusic(body);
		res.status(statusCodes.CREATED).json(music);
	}catch (error){
		next(error);
	}
});

// read all (get)
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
	try{
		const music = await MusicService.readAll();
		if(!music) {
			res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro ao buscar músicas." });
		}else if(music.length > 0){
			res.status(statusCodes.SUCCESS).json(music);
		}else{
			res.status(statusCodes.NO_CONTENT).send(); 
		}
	}catch (error){
		next(error);
	}
});

// read by id (get)
router.get("/id/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) =>{
	try{
		const musicId = Number(req.params.id);
		if (isNaN(musicId)) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "ID inválido fornecido." });
		}

		const music = await MusicService.readById(musicId);
		if (music) {
			res.status(statusCodes.SUCCESS).json(music);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Música não encontrada." });
		}
	}catch (error){
		next(error);
	}
});

// read by name (get)
router.get("/name/:name", verifyJWT, async (req: Request, res: Response, next: NextFunction) =>{
	try {
		const music = await MusicService.readByName(req.params.name);
		if (music) {
			res.status(statusCodes.SUCCESS).json(music);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Música não encontrada." });
		}
	} catch (error){
		next(error);
	}
});


// read by gender (get)
router.get("/genre/:genre", verifyJWT, async (req: Request, res: Response, next: NextFunction) =>{
	try{
		const music = await MusicService.readByGenre(req.params.genre);
		if (music) {
			res.status(statusCodes.SUCCESS).json(music);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Gênero não encontrado." });
		}
	}catch (error){
		next(error);
	}
});

// read by album (get)
router.get("/album/:album", verifyJWT, async (req: Request, res: Response, next: NextFunction) =>{
	try{
		const music = await MusicService.readByAlbum(req.params.album);
		if (music) {
			res.status(statusCodes.SUCCESS).json(music);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Álbum não encontrado." });
		}
	}catch (error){
		next(error);
	}
});

// read by author id (get)
router.get("/artist/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) =>{
	try{
		const authorId = Number(req.params.id);
		if (isNaN(authorId)) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "ID inválido fornecido." });
		}
		const music = await MusicService.readByAuthorId(authorId);
		if (music) {
			res.status(statusCodes.SUCCESS).json(music);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Artista não encontrado." });
		}
	}catch (error){
		next(error);
	}
});

// update music (put)
router.put("/:id", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
	try{
		const musicId = Number(req.params.id);
		if (isNaN(musicId)) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "ID inválido fornecido." });
		}
		const body: Music = req.body;
		if (!body || !body.name || !body.authorId) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "Nome da música e ID do autor são obrigatórios." });
		}

		const music = await MusicService.updateMusic(musicId, body);
		if (music) {
			res.status(statusCodes.SUCCESS).json(music);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Música não encontrado." });
		}
	}catch (error){
		next(error);
	}
});


// delete music (delete)
router.delete("/:id", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
	try{
		const musicId = Number(req.params.id);
		if (isNaN(musicId)) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "ID inválido fornecido." });
		}
		const music = await MusicService.deleteMusic(musicId);
		if (music != null) {
			//res.status(statusCodes.SUCCESS).json(music);
			res.status(statusCodes.NOT_FOUND).json({ error: "Música não foi deletada." });
		} else {
			res.status(statusCodes.SUCCESS).json(music);
		}
	}catch (error){
		next(error);
	}
});

export default router;