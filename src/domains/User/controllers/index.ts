import { User } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";
import { login, logout, notLoggedIn, verifyJWT } from "../../../middlewares/auth";
import Userservice from "../service/Userservice";

const router = Router();

router.post("/login",notLoggedIn,login);
router.get("/logout",verifyJWT,logout);
//Create
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: User = req.body;
		const user = await Userservice.createUser(body);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

//Reads
router.get("/",async (req:Request, res:Response, next:NextFunction) => {
	try {
		const users = await Userservice.readUser();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get("/id/:id",verifyJWT,async (req:Request, res:Response, next:NextFunction) => {
	try {
		const user = await Userservice.readById(Number(req.params.id));
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.get("/name/:name",async (req:Request, res:Response, next:NextFunction) => {
	try {
		const user = await Userservice.readbyName(req.params.name);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.get("/email/:email",async (req:Request, res:Response, next:NextFunction) => {
	try {
		const user = await Userservice.readbyEmail(req.params.email);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

// Update
router.put("/update/:email", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: User = req.body;
		const user = await Userservice.updateNameUser(req.params.email,body);
		res.json(user);
	} catch (error) {
		next(error);
	}
});


//Delete
router.delete("/delete/:email", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.deleteUser(req.params.email);
		res.json(user);
	} catch (error) {
		next(error);
	}
});


export default router;