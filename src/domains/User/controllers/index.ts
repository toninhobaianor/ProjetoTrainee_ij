import { User } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";
import { statusCodes } from "../../../../utils/constants/statusCodes";
import { checkRole, login, logout, notLoggedIn, verifyJWT, cookieExtractor } from "../../../middlewares/auth";
import Userservice from "../service/Userservice";
import { JwtPayload, sign, verify } from "jsonwebtoken";

const router = Router();
router.post("/users/create",async (req: Request, res: Response, next: NextFunction) =>{
	try {
		const body: User = req.body;
		if (!body || !body.senha || !body.email) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "Email e senha são obrigatórios." });
		}
		const user = await Userservice.createCont(body);
		res.status(statusCodes.CREATED).json(user);
	} catch (error) {
		next(error);
	}
});

router.post("/login",notLoggedIn,login);

router.post("/logout",verifyJWT,logout);

router.get("/account", verifyJWT , async (req: Request, res: Response, next: NextFunction) => {
	try {
		//entender melhor sobre o res.cookie
		const token = cookieExtractor(req);
		if(token){
			const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
			req.user = decoded.user;
		}
		const user = Userservice.readById(req.user.id);
	} catch (error) {
		next(error);
	}

});

router.put("/account/password", verifyJWT , async (req: Request, res: Response, next: NextFunction) => {
	try {
		//entender melhor sobre o res.cookie
		const body: string = req.body;
		const cripitografia = await Userservice.encryptPassaword(body);
		const user = Userservice.updatePasswordUser(cripitografia,);
	} catch (error) {
		next(error);
	}

});

router.delete("/account/delete", verifyJWT , async (req: Request, res: Response, next: NextFunction) => {
	try {
		//entender melhor sobre o res.cookie
	} catch (error) {
		next(error);
	}

});

//Create
router.post("/admin/create", verifyJWT ,checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body: User = req.body;
		if (!body || !body.senha || !body.email) {
			return res.status(statusCodes.BAD_REQUEST).json({ error: "Email e senha são obrigatórios." });
		}
		const user = await Userservice.createUser(body);
		res.status(statusCodes.CREATED).json(user);
	} catch (error) {
		next(error);
	}
});

//Read all
router.get("/",verifyJWT ,checkRole(["admin"]), async (req:Request, res:Response, next:NextFunction) => {
	try {
		const users = await Userservice.readUser();
		if(!users) {
			res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não encontramos nenhum Usuario." });
		}else if(users.length > 0){
			res.status(statusCodes.SUCCESS).json(users);
		}else{
			res.status(statusCodes.NO_CONTENT).send();
		}
	} catch (error) {
		next(error);
	}
});

//read com id
router.get("/:id",verifyJWT,checkRole(["admin"]),async (req:Request, res:Response, next:NextFunction) => {
	try {
		const user = await Userservice.readById(Number(req.params.id));
		if (user) {
			res.status(statusCodes.SUCCESS).json(user);
		} else {
			res.status(statusCodes.NOT_FOUND).json({ error: "Não foi encontrado nenhum usuario." });
		}
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
router.delete("/delete/:id",verifyJWT ,checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.deleteById(Number(req.params.id));
		if (user != null) {
			res.status(statusCodes.NOT_FOUND).json({ error: "Usuario não foi deletado." });
		} else {
			res.status(statusCodes.SUCCESS).json(user);
		}
		res.json(user);
	} catch (error) {
		next(error);
	}
});


export default router;