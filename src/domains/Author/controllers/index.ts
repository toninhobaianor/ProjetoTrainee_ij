/* eslint-disable no-mixed-spaces-and-tabs */
import { Router, Request, Response, NextFunction } from "express";
import AuthorService from "../service/AuthorService";
import {Author} from "@prisma/client";
import { login, notLoggedIn, verifyJWT } from "../../../middlewares/auth";
//import { userRoles } from "../../../../utils/constants/userRoles";


const router = Router();

router.post("/login", notLoggedIn, login);


//GET (READ) ALL
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Author = await AuthorService.readAll();
		res.json(Author);
	} catch (error) {
		next(error);
	}
});


//GET (READ) by id
router.get("/:id", verifyJWT, async (req, res, next) => {
	try {
	  const Author = await AuthorService.ReadByID(Number(req.params.id));
	  res.json(Author);
	} catch (error) {
	  next(error);
	}
});


//GET (READ) by music id
router.get("/musicid/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Author = await AuthorService.ReadByIDMusic(Number(req.params.id));
		res.json(Author);
	} catch (error) {
		next(error);
	}
});

//GET (READ) by music name

router.get("/musicname/:name", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Author = await AuthorService.ReadByMusic(req.params.name);
		res.json(Author);
	} catch (error) {
		next(error);
	}
});

//Criando (POST) um Artista
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: Author = req.body;
		const author = await AuthorService.createArtist(body);
		res.json(author);
	} catch (error) {
		next(error);
	}
});

//Atualizando (PUT) um artista

router.put("/:id", async(req: Request, res: Response, next: NextFunction) => {
	try {
		const author = await AuthorService.updateArtist(Number(req.params.id), req.body);
		res.json(author);
	} catch (error) {
		next(error);
	}
});


// delete (delete) artist 
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const author = await AuthorService.deleteArtist(Number(req.params.id)); 
		res.json(author);
	} catch (error) {
		next(error);
	}
});


export	default router;