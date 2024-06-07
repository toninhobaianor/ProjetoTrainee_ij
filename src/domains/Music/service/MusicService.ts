import prisma from "../../../../config/prismaClient";
import {Music} from "@prisma/client";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";

//import bcrypt from "bcrypt";

class MusicService{
	// CREATE
	// falta tratamento de erro e autenticação
	async createMusic(body: Music){
		const result = await prisma.music.create({
			data:{
				album: body.album,
				genre: body.genre,
				name: body.name,
				author: {
					connect: { id: body.authorId },
				},
			},

		});
		return result;
	}

	// READ
	// falta autenticação e status
	async readAll(){
		try{
			const result = await prisma.music.findMany({
				orderBy: {
					name: "asc"
				}
			});

			if(result.length > 0){
				return result;
			}else{
				throw new QueryError("Sua pesquisa não gerou resultados.");
			}
		}catch(error){
			if(error instanceof QueryError){
				console.log(error.message);
			}else{
				console.log("Ocorreu um erro inesperado:", error);
			}
		}
        
	}

	// falta autenticação e status
	async readById(id: number){
		try{
			if(isNaN(id)){
				throw new InvalidParamError("O parâmetro deve ser um número.");
			}
			const result = await prisma.music.findUnique({
				where:{
					id: Number(id)
				}
			});

			if(result){
				return result;
			}else{
				throw new QueryError("Sua pesquisa não gerou resultados. O ID '" + id + "' não está na nossa base de dados.");
			}
		}catch(error){
			if(error instanceof InvalidParamError || error instanceof QueryError){
				console.log(error.message);
			}else{
				console.log("Ocorreu um erro inesperado:", error);
			}
		}
	}

	// falta autenticação e status
	async readByName(wantedName: string){
		try{
			if(wantedName.trim() === ""){
				throw new InvalidParamError("O parâmetro não pode ser uma string vazia.");
			}
			const result = await prisma.music.findMany({
				where:{
					name: wantedName
				}
			});

			if(result.length > 0){
				return result;
			}else{
				throw new QueryError("Sua pesquisa não gerou resultados. O nome '" + wantedName + "' não está na nossa base de dados.");
			}

		}catch(error){
			if(error instanceof InvalidParamError || error instanceof QueryError){
				console.log(error.message);
			}else{
				console.log("Ocorreu um erro inesperado:", error);
			}
		}
	}

	// falta e autenticação e status
	async readByGenre(wantedGenre: string){
		try{
			if(wantedGenre.trim() === ""){
				throw new InvalidParamError("O parâmetro não pode ser uma string vazia.");
			}
			const result = await prisma.music.findMany({
				where:{
					genre: wantedGenre
				}
			});

			if(result.length > 0){
				return result;
			}else{
				throw new QueryError("Sua pesquisa não gerou resultados. O gênero '" + wantedGenre + "' não está na nossa base de dados.");
			}
		}catch(error){
			if(error instanceof InvalidParamError || error instanceof QueryError){
				console.log(error.message);
			}else{
				console.log("Ocorreu um erro inesperado:", error);
			}
		}
	}

	// falta e autenticação e status
	async readByAlbum(wantedAlbum: string){
		try{
			if(wantedAlbum.trim() === ""){
				throw new InvalidParamError("O parâmetro não pode ser uma string vazia.");
			}
			const result = await prisma.music.findMany({
				where:{
					album: wantedAlbum
				}
			});

			if(result.length > 0){
				return result;
			}else{
				throw new QueryError("Sua pesquisa não gerou resultados. O álbum '" + wantedAlbum + "' não está na nossa base de dados.");
			}
		}catch(error){
			if(error instanceof InvalidParamError || error instanceof QueryError){
				console.log(error.message);
			}else{
				console.log("Ocorreu um erro inesperado:", error);
			}
		}
	}

	//falta autenticação e status
	async readByAuthorId(wantedAuthorId: number){
		try{
			if(isNaN(wantedAuthorId)){
				throw new InvalidParamError("O parâmetro deve ser um número.");
			}
			const result = await prisma.music.findMany({
				where:{
					authorId: wantedAuthorId

				},
				orderBy:{
					name: "asc",
				}
			});

			if(result.length > 0){
				return result;
			}else{
				throw new QueryError("Sua pesquisa não gerou resultados. O ID '" + wantedAuthorId + "' não está na nossa base de dados.");
			}
		}catch(error){
			if(error instanceof InvalidParamError || error instanceof QueryError){
				console.log(error.message);
			}else{
				console.log("Ocorreu um erro inesperado:", error);
			}
		}
	}

	// UPDATE
	// falta tratamento de erro e autenticação
	async updateMusic(id: number, body: Music){
		try{
			const music = await this.readById(id);

			if(music){
				const newMusic = await prisma.music.update({
					data:{
						album: body.album,
						genre: body.genre,
						name: body.name,
						authorId: body.authorId,
					}, 
					where:{
						id
					}
				});

				return newMusic;
			}else{
				throw new Error("Sua atualização não funcionou.");
			}

		}catch(error){
			console.log(error);
		}
	}

	// DELETE
	// falta tratamento de erro e autenticação
	async deleteMusic(wantedId: number){
		try{
			const music = await this.readById(wantedId);

			if(music){
				await prisma.music.delete({
					where:{
						id: wantedId,
					}
				});
			}else{
				throw new Error("Não foi possível deletar a música.");
			}
		}catch(error){
			console.log(error);
		}
	}

}

export default new MusicService();