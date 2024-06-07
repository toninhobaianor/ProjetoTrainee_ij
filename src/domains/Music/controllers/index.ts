import { Router, Request, Response, NextFunction } from "express";
import MusicService from "../service/MusicService";
import {Music} from "@prisma/client";
import { statusCodes } from "../../../../utils/constants/statusCodes";

const router = Router();

//create a music (post)
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
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
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
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
router.get("/id/:id", async (req: Request, res: Response, next: NextFunction) =>{
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
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) =>{
	try {
		const music = await MusicService.readByName(req.params.name);
		res.json(music);
	} catch (error){
		next(error);
	}
});


// read by gender (get)
router.get("/genre/:genre", async (req: Request, res: Response, next: NextFunction) =>{
	try{
		const music = await MusicService.readByGenre(req.params.genre);
		res.json(music);
	}catch (error){
		next(error);
	}
});

// read by album (get)
router.get("/album/:album", async (req: Request, res: Response, next: NextFunction) =>{
	try{
		const music = await MusicService.readByAlbum(req.params.album);
		res.json(music);
	}catch (error){
		next(error);
	}
});

// read by author id (get)
router.get("/artist/:id", async (req: Request, res: Response, next: NextFunction) =>{
	try{
		const music = await MusicService.readByAuthorId(Number(req.params.id));
		res.json(music);
	}catch (error){
		next(error);
	}
});

// update music (put)
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try{
		const body: Music = req.body;
		const music = await MusicService.updateMusic(Number(req.params.id), body);
		res.json(music);
	}catch (error){
		next(error);
	}
});


// delete music (delete)
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try{
		const music = await MusicService.deleteMusic(Number(req.params.id));
		res.json(music);
	}catch (error){
		next(error);
	}
});

export default router;