import { User } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";
import { statusCodes } from "../../../../utils/constants/statusCodes";
import { checkRole, login, logout, notLoggedIn, verifyJWT } from "../../../middlewares/auth";
import Userservice from "../service/Userservice";

const router = Router();
router.post("/create",async (req: Request, res: Response, next: NextFunction) =>{
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
		res.json(req.user);
	} catch (error) {
		next(error);
	}
});


router.put("/account/updatePassword", verifyJWT , async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.updatePasswordUser(req.body.senha,req.user);
		if(user){
			res.status(statusCodes.SUCCESS).json(user);
		}else{
			res.status(statusCodes.NOT_FOUND).send();
		}
	} catch (error) {
		next(error);
	}

});

router.put("/account/updateName", verifyJWT , async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.updateNameUser(req.body.name,req.user);
		if(user){
			res.status(statusCodes.SUCCESS).json(user);
		}else{
			res.status(statusCodes.NOT_FOUND).send();
		}
	} catch (error) {
		next(error);
	}
});

router.put("/account/updateEmail", verifyJWT , async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.updateEmailUser(req.body.email,req.user);
		if(user){
			res.status(statusCodes.SUCCESS).json(user);
		}else{
			res.status(statusCodes.NOT_FOUND).send();
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/account/delete", verifyJWT ,logout ,async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.deleteUser(req.user.email);
		if(user){
			res.status(statusCodes.SUCCESS).json(user);
		}else{
			res.status(statusCodes.NOT_FOUND).send();
		}
	} catch (error) {
		next(error);
	}

});

//FUNCIONALIDES DO ADMIN
//criar outro admin ou usuario sendo um admin
router.post("/admin/create", verifyJWT , checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
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
router.get("/admin/",verifyJWT ,checkRole("admin"), async (req:Request, res:Response, next:NextFunction) => {
	try {
		const users = await Userservice.readUser();
		if(users.length > 0){
			res.status(statusCodes.SUCCESS).json(users);
		}else{
			res.status(statusCodes.NO_CONTENT).send();
		}
	} catch (error) {
		next(error);
	}
});

//read com id
router.get("/admin/id/:id",verifyJWT, checkRole("admin"), async (req:Request, res:Response, next:NextFunction) => {
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

//read name
router.get("/admin/name/:name",verifyJWT, checkRole("admin"), async (req:Request, res:Response, next:NextFunction) => {
	try {
		const user = await Userservice.readbyName(req.params.name);
		if (user) {
			res.status(statusCodes.SUCCESS).json(user);
		} else {
			res.status(statusCodes.NOT_FOUND).json();
		}
	} catch (error) {
		next(error);
	}
});

//read email
router.get("/admin/email/:email",verifyJWT,checkRole("admin"),async (req:Request, res:Response, next:NextFunction) => {
	try {
		const user = await Userservice.readbyEmail(req.params.email);
		if (user) {
			res.status(statusCodes.SUCCESS).json(user);
		} else {
			res.status(statusCodes.NOT_FOUND).json();
		}
	} catch (error) {
		next(error);
	}
});

//um admin possa ver sua propria conta
router.get("/admin/adminaccount", verifyJWT , checkRole("admin"),async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.json(req.user);
	} catch (error) {
		next(error);
	}
});

// Update email
router.put("/admin/updateEmail", verifyJWT,checkRole("admin"),async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.updateEmailUser(req.body.email,req.user);
		if (user) {
			res.status(statusCodes.SUCCESS).json(user);
		} else {
			res.status(statusCodes.NOT_FOUND).json();
		}
	} catch (error) {
		next(error);
	}
});

// Update senha
router.put("/admin/updatePassword", verifyJWT,checkRole("admin"),async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.updatePasswordUser(req.body.senha,req.user);
		if (user) {
			res.status(statusCodes.SUCCESS).json(user);
		} else {
			res.status(statusCodes.NOT_FOUND).json();
		}
	} catch (error) {
		next(error);
	}
});

//Update name
router.put("/admin/updateName", verifyJWT ,checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.updateNameUser(req.body.name,req.user);
		if(user){
			res.status(statusCodes.SUCCESS).json(user);
		}else{
			res.status(statusCodes.NOT_FOUND).send();
		}
	} catch (error) {
		next(error);
	}
});

//deletar o proprio usuario admin
router.delete("/admin/delete", verifyJWT ,logout , checkRole("admin"), logout , async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.deleteUser(req.user.email);
		if(user){
			res.status(statusCodes.SUCCESS).json(user);
		}else{
			res.status(statusCodes.NOT_FOUND).send();
		}
	} catch (error) {
		next(error);
	}

});


//Deletar outros usuarios sendo o admin
router.delete("/admin/delete/:id",verifyJWT ,checkRole("admin"),async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await Userservice.deleteById(Number(req.params.id));
		if (user != null) {
			res.status(statusCodes.NOT_FOUND).json();
		} else {
			res.status(statusCodes.SUCCESS).json(user);
		}
	} catch (error) {
		next(error);
	}
});

//"email": "luisrobert@gmail.com",
//  "senha": "123"


export default router;