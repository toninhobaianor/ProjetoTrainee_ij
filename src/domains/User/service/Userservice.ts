import prisma from "../../../../config/prismaClient";
import { User } from "@prisma/client";
import { InvalidParamError } from"../../../../errors/InvalidParamError";
import { QueryError } from"../../../../errors/QueryError";
import bcrypt from "bcrypt";

class UserService{
	async encryptPassaword(senha: string){
		const saltRounds = 10;
		const cripitografado = await bcrypt.hash(senha,saltRounds);
		return cripitografado;
	}
	
	async createUser(body: User){
		if (!body.email) {
			throw new InvalidParamError("O campo 'email' é obrigatório.");
		}
		
		try{
			const condicao = await prisma.user.findUnique({
				where:{
					email: body.email
				}
			});
			
			if(condicao == null){
				const cripitografia = await this.encryptPassaword(body.senha);
				const user = await prisma.user.create({
					data: {
						name: body.name,
						email: body.email,
						photo: body.photo,
						senha: cripitografia,
						tem_privilegio: body.tem_privilegio
					}
				});
				return user;
			}
			else{
				throw new QueryError("Não foi possivel realizar o cadastro pois o email já existe.");
			}
		}
		catch(error){
			console.log(error);
		}
	}
	async createCont(body: User){
		if (!body.email) {
			throw new InvalidParamError("O campo 'email' é obrigatório.");
		}
		
		try{
			const condicao = await prisma.user.findUnique({
				where:{
					email: body.email
				}
			});
			
			if(condicao == null){
				const cripitografia = await this.encryptPassaword(body.senha);
				const user = await prisma.user.create({
					data: {
						name: body.name,
						email: body.email,
						photo: body.photo,
						senha: cripitografia,
						tem_privilegio: "user"
					}
				});
				return user;
			}
			else{
				throw new QueryError("Não foi possivel realizar o cadastro pois o email já existe.");
			}
		}
		catch(error){
			console.log(error);
		}
	}

	async updateNameUser(name: string,body: User){
		const user = await this.readbyEmail(body.email);
		if(user){
			const newUser = await prisma.user.updateMany({
				data:{
					name: name,
					photo: body.photo,
					senha: body.senha,
					tem_privilegio: body.tem_privilegio
				}, 
				where:{
					email: body.email,
				}
			});
			return newUser;
		}else{
			throw new QueryError("Sua atualização não funcionou.");
		}
	}

	async updatePasswordUser(senha: string,body: User){
		const user = await this.readbyEmail(body.email);

		if(user){
			const cripitografia = await this.encryptPassaword(senha);
			const newUser = await prisma.user.updateMany({
				data:{
					name: body.name,
					photo: body.photo,
					senha: cripitografia,
					tem_privilegio: body.tem_privilegio
				}, 
				where:{
					email: body.email,
				}
			});
			return newUser;
		}else{
			throw new QueryError("Sua atualização não funcionou.");
		}
	}

	async updateEmailUser(email: string,body: User){
		const user = await this.readbyEmail(body.email);
		if(user){
			const newUser = await prisma.user.updateMany({
				data:{
					name: body.name,
					photo: body.photo,
					senha: body.senha,
					tem_privilegio: body.tem_privilegio
				}, 
				where:{
					email: email,
				}
			});

			return newUser;
		}else{
			throw new QueryError("Sua atualização não funcionou.");
		}

		
	}

	async readUser(){

		const user = await prisma.user.findMany({
			orderBy: {
				name: "asc"
			}
		});

		if(user && user.length > 0){
			return user;
		}
		else{
			throw new QueryError("A lista de usuarios esta vazia.");
		}
	}

	async readById(wantedId: number){
			const result = await prisma.user.findUnique({
				where:{
					id: Number(wantedId),
				}
			});

			if(result){
				return result;
			}else{
				throw new InvalidParamError("Sua pesquisa não gerou resultados. O ID '" + wantedId + "' não está na nossa base de dados.");
			}
	}

	async readbyName(wantedName:string){
		const wanteds = await prisma.user.findMany({
			where: { name: wantedName },
		});
		if(wanteds && wanteds.length > 0){
			return wanteds;
		}
		else{
			throw new InvalidParamError("Não existe ninguem com este nome na nossa base de dados");
		}
	}

	async readbyEmail(wantedEmail:string){
		const wanted = await prisma.user.findUnique({
			where: { email: wantedEmail },
		});

		if(wanted){
			return wanted;
		}
		else{
			throw new InvalidParamError("Não existe este email na nossa base de dados");
		}
	}

	async deleteUser(wantedEmail: string){
		const condicao = await this.readbyEmail(wantedEmail);
		try{
			if(condicao){
				const result = await prisma.user.delete({
					where: {
						email: wantedEmail,
					},
				});
				return result;
			}
			else{
				throw new InvalidParamError("O email informado não existe.");
			}
		}
		catch(error){
			console.log(error);
		}
	}

	async deleteById(wantedId: number){
		const user = await this.readById(wantedId);
		try{
			if(user != null){
				const result = await prisma.user.delete({
					where: {
						email: user.email,
					},
				});
				return result;
			}
			else{
				throw new InvalidParamError("O id informado não existe.");
			}
		}
		catch(error){
			console.log(error);
		}
	}

}

export default new UserService();