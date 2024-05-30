import { Router, Request, Response, NextFunction } from "express";
import MusicService from "../service/MusicService";
import {Music} from "@prisma/client";

const router = Router();

//create a music (post)
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: Music = req.body;
		const music = await MusicService.createMusic(body);
		res.json(music);
	} catch (error) {
		next(error);
	}
});

// read all (get)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const music = await MusicService.readAll();
		res.json(music);
	} catch (error) {
		next(error);
	}
});

// read by id (get)
router.get("/id/:id", async (req: Request, res: Response, next: NextFunction) =>{
	try{
		const music = await MusicService.readById(Number(req.params.id));
		res.json(music);
	}catch (error) {
		next(error);
	}
});

// read by name (get)
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) =>{
	try {
		const music = await MusicService.readByName(req.params.name);
		res.json(music);
	} catch (error) {
		next(error);
	}
});


// read by gender (get)
router.get("/genre/:genre", async (req: Request, res: Response, next: NextFunction) =>{
	try {
		const music = await MusicService.readByGenre(req.params.genre);
		res.json(music);
	} catch (error) {
		next(error);
	}
});

// read by album (get)
router.get("/album/:album", async (req: Request, res: Response, next: NextFunction) =>{
	try {
		const music = await MusicService.readByAlbum(req.params.album);
		res.json(music);
	} catch (error) {
		next(error);
	}
});

// read by author id (get)
router.get("/authorId/:authorId", async (req: Request, res: Response, next: NextFunction) =>{
	try {
		const music = await MusicService.readByAuthorId(Number(req.params.authorId));
		res.json(music);
	} catch (error) {
		next(error);
	}
});

// update music (put)
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {

		const body: Music = req.body;
		const music = await MusicService.updateMusic(Number(req.params.id), body);
		res.json(music);
	} catch (error) {
		next(error);
	}
});


// delete music (delete)
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const music = await MusicService.deleteMusic(Number(req.params.id));
		res.json(music);
	} catch (error) {
		next(error);
	}
});

export default router;