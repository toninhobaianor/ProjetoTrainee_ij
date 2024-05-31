import prisma from "../../../../config/prismaClient";
import {User} from "@prisma/client";

class UserService{
	async createUser(body: User){
		const condicao = await prisma.user.findUnique({
			where: { email: body.email },
		});
		try{
			if(condicao == null){
				const user = await prisma.user.create({
					data: {
						name: body.name,
						email: body.email,
						photo: body.photo,
						senha: body.senha,
						tem_privilegio: body.tem_privilegio
					}
				});
				return user;
			}
			else{
				throw new Error("Não foi possivel realizar o cadastro pois o email já existe.");
			}
		}
		catch(error){
			console.log(error);
		}
	}

  async updateNameUser(name: string,email: string){
		try{
      const user = await this.readbyEmail(email);

			if(user){
				const newUser = await prisma.user.updateMany({
					data:{
						email: user.email,
						photo: user.photo,
						senha: user.senha,
						tem_privilegio: user.tem_privilegio
					}, 
					where:{
						name: name,
					}
				});

				return newUser;
			}else{
				throw new Error("Sua atualização não funcionou.");
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
				throw new Error("Sua pesquisa não gerou resultados. O ID '" + wantedId + "' não está na nossa base de dados.");
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
				throw new Error("Não existe ninguem com este nome na nossa base de dados");
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
				throw new Error("Não existe este email na nossa base de dados");
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
				throw new Error("O email informado para deletar não existe.");
			}
		}
		catch(error){
			console.log(error);
		}
	}

}

export default new UserService();