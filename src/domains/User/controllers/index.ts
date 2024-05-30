import { Router, Request, Response, NextFunction } from "express";
import Userservice from "../service/Userservice";

const router = Router();

router.get("/",async (req:Request, res:Response, next:NextFunction) => {
	try {
		const users = await Userservice.readUser();
		res.json(users);
	} catch (error) {
		next(error);
	}
})

router.get("/:id",async (req:Request, res:Response, next:NextFunction) => {
	try {
		const user = await Userservice.readById(Number(req.params.id));
		res.json(user);
	} catch (error) {
		next(error);
	}
})

export default router;