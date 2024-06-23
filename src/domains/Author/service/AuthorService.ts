import prisma from "../../../../config/prismaClient";
import {Author} from "@prisma/client";


class AuthorService{

	//CREATE
	
	async createArtist(body: Author){
		if (!body || !body.Author ){
			throw new Error("Parâmetros inválidos fornecidos.");
		}
		const author = await prisma.author.create({
			data: {
				Author: body.Author,
				photo: body.photo,
				StreamCount: body.StreamCount,
                

			},
		});

		return author;
        
	}

	//READ

	async readAll(){
		const result = await prisma.author.findMany({
			orderBy: {
				StreamCount: "desc"
			}
		});

		if(result.length > 0){
			return result;
		}else{
			throw new Error("Sua pesquisa não gerou resultados.");
		}
	}
        

	async ReadByID(id: number){
		try{
			const result = await prisma.author.findUnique({
				where: {id: Number(id)},
			});
			if(result){
				return result;
			}else{
				throw new Error("Sua pesquisa não gerou resultados. O ID: '" + id + "' não está na nossa base de dados.");
			}

		}catch(error){
			console.log(error);
		} 

	}

	async ReadByMusic(music: string ){
		try{
			const result = await prisma.author.findFirst({
				where: {
					musics: {
						some: {
							name: music,
						},

					},
				},
			});
			if(result){
				return result;
			}else{
				throw new Error("Sua pesquisa não gerou resultados. A música: '" + music + "' não está na nossa base de dados.");
			}



		}catch(error){
			console.log(error);
		} 
	}

	async ReadByIDMusic(id: number ){
		try{
			const result = await prisma.author.findFirst({
				where: {
					musics: {
						some: {
							id: Number(id),
						},

					},
				},
			});
			if(result){
				return result;
			}else{
				throw new Error("Sua pesquisa não gerou resultados. O ID: '" + id + "' não está na nossa base de dados.");
			}
		}catch(error){
			console.log(error);
		} 
	}

	//UPDATE
	async updateArtist(id: number, body: Author){
		try{
			const author = await this.ReadByID(id);
			console.log(author);

			if(author){
				const result = await prisma.author.update({
					data:{
						Author: body.Author,
						photo: body.photo,
						StreamCount: body.StreamCount,

					}, where:{
						id: id,
					},
				});
				return result;

			}else{
				throw new Error("Não foi possível Atualizar o artista.");
			}



		}catch(error){
			console.log(error);
		} 
	}



	//delete
	async deleteArtist(id: number ){
		if(isNaN(id)){
			throw new Error("O parâmetro deve ser um número.");
		}
		const author = await this.ReadByID(id);
		console.log(author);

		if(author){
			await prisma.author.delete({
				where: {
					id: Number(id),
				},
			});
		}else{
			throw new Error("Não foi possível deletar o artista.");
		}
	}



}

export default new AuthorService();