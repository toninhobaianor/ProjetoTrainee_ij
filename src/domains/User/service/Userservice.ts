import prisma from "../../../../config/prismaClient";
import { User } from "@prisma/client";
import { InvalidParamError } from"../../../../errors/InvalidParamError"
import { QueryError } from"../../../../errors/QueryError"
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

	async updateNameUser(name: string,body: User){
		try{
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

		}catch(error){
			console.log(error);
		}
	}

	async updatePasswordUser(senha: string,body: User){
		try{
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

		}catch(error){
			console.log(error);
		}
	}

	async updateEmailUser(email: string,body: User){
		try{
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

		}catch(error){
			console.log(error);
		}
	}

	async readUser(){
		const user = await prisma.user.findMany();
		try{
			if(user.length == 0){
				throw new Error("A lista de usuarios esta vazia.");
			}
			else{
				return user;
			}
		}
		catch(error){
			console.log(error);
		}
	}

	async readById(wantedId: number){
		try{
			const result = await prisma.user.findUnique({
				where:{
					id: Number(wantedId)
				}
			});

			if(result){
				return result;
			}else{
				throw new InvalidParamError("Sua pesquisa não gerou resultados. O ID '" + wantedId + "' não está na nossa base de dados.");
			}
		}catch(error){
			console.log(error);
		}
	}

	async readbyName(wantedName:string){
		const wanteds = await prisma.user.findMany({
			where: { name: wantedName },
		});
		try{
			if(wanteds.length == 0){
				throw new InvalidParamError("Não existe ninguem com este nome na nossa base de dados");
			}
			else{
				return wanteds;
			}
		}
		catch(error){
			console.log(error);
		}
	}

	async readbyEmail(wantedEmail:string){
		const wanted = await prisma.user.findUnique({
			where: { email: wantedEmail },
		});
		try{
			if(wanted == null){
				throw new InvalidParamError("Não existe este email na nossa base de dados");
			}
			else{
				return wanted;
			}
		}
		catch(error){
			console.log(error);
		}
	}

	async deleteUser(proc: string){
		const condicao = await prisma.user.findUnique({
			where: { email: proc },
		});
		try{
			if(condicao != null){
				const result = await prisma.user.delete({
					where: {
						email: proc,
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

}

export default new UserService();