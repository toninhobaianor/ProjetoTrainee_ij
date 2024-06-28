import prisma from "../../../../config/prismaClient";
import {Music} from "@prisma/client";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";

//import bcrypt from "bcrypt";

class MusicService{
	// CREATE
	async createMusic(body: Music){
		
		if (!body || !body.name || isNaN(body.authorId) || !body.authorId){
			throw new InvalidParamError("Parâmetros inválidos fornecidos.");
		}

		const authorExists = await prisma.author.findUnique({
			where: { id: body.authorId },
		});
		
		if (!authorExists) {
			throw new QueryError("Artista não encontrado.");
		}

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
	async readAll(){
		
		const result = await prisma.music.findMany({
			orderBy: {
				name: "asc"
			}
		});

		if(result && result.length > 0){
			return result;
		}else{
			throw new QueryError("Sua pesquisa não gerou resultados.");
		}
		
        
	}

	async readById(id: number){
		
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
		
	}

	async readByName(wantedName: string){
		
		if(wantedName.trim() === ""){
			throw new InvalidParamError("O parâmetro não pode ser uma string vazia.");
		}
		const result = await prisma.music.findMany({
			where:{
				name: wantedName
			}
		});

		if(result && result.length > 0){
			return result;
		}else{
			throw new QueryError("Sua pesquisa não gerou resultados. O nome '" + wantedName + "' não está na nossa base de dados.");
		}

		
	}

	async readByGenre(wantedGenre: string){
		
		if(wantedGenre.trim() === ""){
			throw new InvalidParamError("O parâmetro não pode ser uma string vazia.");
		}
		const result = await prisma.music.findMany({
			where:{
				genre: wantedGenre
			}
		});

		if(result && result.length > 0){
			return result;
		}else{
			throw new QueryError("Sua pesquisa não gerou resultados. O gênero '" + wantedGenre + "' não está na nossa base de dados.");
		}
		
	}

	async readByAlbum(wantedAlbum: string){
		
		if(wantedAlbum.trim() === ""){
			throw new InvalidParamError("O parâmetro não pode ser uma string vazia.");
		}
		const result = await prisma.music.findMany({
			where:{
				album: wantedAlbum
			}
		});

		if(result && result.length > 0){
			return result;
		}else{
			throw new QueryError("Sua pesquisa não gerou resultados. O álbum '" + wantedAlbum + "' não está na nossa base de dados.");
		}
		
	}

	async readByAuthorId(wantedAuthorId: number){
		
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

		if(result && result.length > 0){
			return result;
		}else{
			throw new QueryError("Sua pesquisa não gerou resultados. O ID '" + wantedAuthorId + "' não está na nossa base de dados.");
		}
		
	}

	// UPDATE
	async updateMusic(id: number, body: Music){
		
		if(isNaN(id)){
			throw new InvalidParamError("O parâmetro deve ser um número.");
		}

		const music = await this.readById(id);
		if (!music) {
			throw new QueryError("Música não encontrada.");
		}

		const authorExists = await prisma.author.findUnique({
			where: { id: body.authorId },
		});
    
		if (!authorExists) {
			throw new QueryError("Artista não encontrado.");
		}

		const newMusic = await prisma.music.update({
			data: {
				album: body.album,
				genre: body.genre,
				name: body.name,
				authorId: body.authorId,
			}, 
			where: {
				id
			}
		});
	
		return newMusic;
	}

	// DELETE
	async deleteMusic(wantedId: number){
		
		if(isNaN(wantedId)){
			throw new InvalidParamError("O parâmetro deve ser um número.");
		}
		const music = await this.readById(wantedId);

		if(music){
			await prisma.music.delete({
				where:{
					id: wantedId,
				}
			});
		}else{
			throw new QueryError("Música não encontrada.");
		}
		
	}

}

export default new MusicService();