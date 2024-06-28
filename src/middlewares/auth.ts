/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prismaClient";
import { PermissionError } from"../../errors/PermissionError";
import { TokenError } from"../../errors/TokenError";
import { compare } from "bcrypt";
import statusCodes from "../../utils/constants/statusCodes";
import { User } from "@prisma/client";
import { JwtPayload, sign, verify } from "jsonwebtoken";



function generateJWT(user: User, res: Response){
	const body = {
		id: user.id,
		email: user.email,
		tem_privilegio: user.tem_privilegio,
		name: user.name
	};

	const token = sign({user: body},process.env.SECRET_KEY || "", {expiresIn: process.env.JWT_EXPIRATION});

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development"
	});
}


function cookieExtractor(req: Request) {
	let token = null;
	if (req.cookies){
		token = req.cookies["jwt"];
	}
	return token;
}


export function verifyJWT(req: Request, res: Response, next: NextFunction){
	try {
		const token = cookieExtractor(req);

		if(token){
			const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;

			req.user = decoded.user;
		}

		if(req.user == null){
			throw new TokenError("Você precisa estar logado para realizar essa ação");
		}
		next();

	} catch (error) {
		next(error);
	}

}


export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await prisma.user.findUnique({
			where:{
				email:req.body.email
			}
		});
		if(!user){
			throw new PermissionError("Email e/ou senha incorretos!");
		}
		const match = await compare(req.body.senha,user.senha);
		if(!match){
			throw new PermissionError("Email e/ou senha incorretos!");
		}
		generateJWT(user, res);

		res.status(statusCodes.SUCCESS).json("login Realizado com sucesso!");
	} catch (error) {
		next(error);
	}
    
}

export async function notLoggedIn(req: Request, res: Response, next: NextFunction) {
	try {

		const token = cookieExtractor(req);
		if(token){
			throw new PermissionError("O usuário está logado");
		}
		next();

	}catch(error){
		
		next(error);
	}
        
        
	
}


export async function logout(req: Request, res: Response, next: NextFunction) {
	try {

		if(req.user){
			res.clearCookie("jwt",{
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development"

			});
			res.status(statusCodes.SUCCESS).json("Logout realizado");
		}else{
			throw new TokenError("Você precisa estar logado para realizar essa ação");
		}
        

	}catch(error){
		next(error);
	}
}



export function checkRole(requiredRole: string) {
	return async (req: Request, res: Response, next: NextFunction) => {
	  // eslint-disable-next-line no-mixed-spaces-and-tabs
	  try {
		  	const token = cookieExtractor(req);
		  	const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
		  	req.user = decoded.user;
		  	if (req.user.tem_privilegio !== requiredRole) {
				throw new PermissionError("Você não tem permissão para acessar este recurso.");
		  	}
		  	next();
			
	  } catch (error) {
			next(error);
	  }
	};
}