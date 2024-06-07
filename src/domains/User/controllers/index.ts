import { User } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";
import { login, logout, notLoggedIn, verifyJWT } from "../../../middlewares/auth";
import Userservice from "../service/Userservice";

const router = Router();
router.post("/users/create",async (req: Request, res: Response, next: NextFunction) =>{
	try {
		const body: User = req.body;
		const user = await Userservice.createCont(body);
		res.json(user);
	} catch (error) {
		next(error);
	}
})

router.post("/users/login",notLoggedIn,login);

router.post("/users/logout",verifyJWT,logout);

router.get("/users/account",verifyJWT)
//Create
router.post("/users/admin/create", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: User = req.body;
		const user = await Userservice.createUser(body);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

//Reads
router.get("/users",async (req:Request, res:Response, next:NextFunction) => {
	try {
		const users = await Userservice.readUser();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get("/users/:id",verifyJWT,async (req:Request, res:Response, next:NextFunction) => {
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
router.put("/users/update/:email", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: User = req.body;
		const user = await Userservice.updateNameUser(req.params.email,body);
		res.json(user);
	} catch (error) {
		next(error);
	}
});


//Delete
router.delete("/users/delete/:email", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.deleteUser(req.params.email);
		res.json(user);
	} catch (error) {
		next(error);
	}
});


export default router;