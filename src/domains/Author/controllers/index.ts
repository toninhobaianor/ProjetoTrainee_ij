/* eslint-disable no-mixed-spaces-and-tabs */
import { Router, Request, Response, NextFunction } from "express";
import { statusCodes } from "../../../../utils/constants/statusCodes";
import AuthorService from "../service/AuthorService";
import {Author} from "@prisma/client";
import { login, logout, notLoggedIn, verifyJWT, checkRole } from "../../../middlewares/auth";
//import { userRoles } from "../../../../utils/constants/userRoles";


const router = Router();

router.post("/login", notLoggedIn, login);
router.post("/logout", logout);

//GET (READ) ALL
router.get("/", verifyJWT ,async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Author = await AuthorService.readAll();
		if(!Author) {
			res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não temos nenhum autor cadastrado." });
		}else if(Author.length > 0){
			res.status(statusCodes.SUCCESS).json(Author);
		}else{
			res.status(statusCodes.NO_CONTENT).send(); 
		}
	} catch (error) {
		next(error);
	}
});


//GET (READ) by Name Author
router.get("/:name", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Author = await AuthorService.ReadByName(req.params.name);
		if (Author) {
			res.status(statusCodes.SUCCESS).json(Author);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Não foi encontrado nenhum Artista." });
		}
	} catch (error) {
		next(error);
	}
});


//GET (READ) by id
router.get("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Author = await AuthorService.ReadByID(Number(req.params.id));
		if (Author) {
			res.status(statusCodes.SUCCESS).json(Author);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Não foi encontrado nenhum autor." });
		}
	} catch (error) {
		next(error);
	}
});


//GET (READ) by music id
router.get("/musicid/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Author = await AuthorService.ReadByIDMusic(Number(req.params.id));
		if (Author) {
			res.status(statusCodes.SUCCESS).json(Author);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Não foi encontrado nenhuma música desse autor." });
		}
	} catch (error) {
		next(error);
	}
});

//GET (READ) by music name

router.get("/musicname/:name", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Author = await AuthorService.ReadByMusic(req.params.name);
		if (Author) {
			res.status(statusCodes.SUCCESS).json(Author);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Não foi encontrado nenhuma autor com este nome." });
		}
	} catch (error) {
		next(error);
	}
});

//Criando (POST) um Artista
router.post("/create", verifyJWT, checkRole("admin") , async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: Author = req.body;
		if (!body || !body.Author) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: " É necessario o Nome do autor." });
		}
		const author = await AuthorService.createArtist(body);
		res.status(statusCodes.CREATED).json(author);
	} catch (error) {
		next(error);
	}
});

//Atualizando (PUT) um artista

router.put("/update/:id", verifyJWT, checkRole("admin") , async(req: Request, res: Response, next: NextFunction) => {
	try {
		const body: Author = req.body;
		if (!body) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "Nenhum autor foi passado." });
		}
		const author = await AuthorService.updateArtist(Number(req.params.id), body);
		if (author) {
			res.status(statusCodes.SUCCESS).json(author);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Nenhum autor foi encontrado." });
		}
	} catch (error) {
		next(error);
	}
});


// delete (delete) artist 
router.delete("/delete/:id", verifyJWT, checkRole("admin") ,async (req: Request, res: Response, next: NextFunction) => {
	try {



		const author = await AuthorService.deleteArtist(Number(req.params.id));
		if (author) {
			res.status(statusCodes.SUCCESS).json(author);
			
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "O autor não foi deletado." });	
		} 
	} catch (error) {
		next(error);
	}
});


export	default router;