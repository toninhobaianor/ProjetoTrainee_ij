import prisma from "../../../../config/prismaClient";
import {Music} from "@prisma/client";

class MusicService{
	// CREATE
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
	async readAll(){
		try{
			const result = await prisma.music.findMany({
				orderBy: {
					album: "asc",
				}
			});

			if(result.length > 0){
				return result;
			}else{
				throw new Error("Sua pesquisa não gerou resultados.");
			}
		}catch(error){
			console.log(error);
		}
        
	}

	async readById(id: number){
		try{
			const result = await prisma.music.findUnique({
				where:{
					id: Number(id)
				}
			});

			if(result){
				return result;
			}else{
				throw new Error("Sua pesquisa não gerou resultados. O ID '" + id + "' não está na nossa base de dados.");
			}
		}catch(error){
			console.log(error);
		}
	}

	async readByName(wantedName: string){
		try{
			const result = await prisma.music.findMany({
				where:{
					name: wantedName
				}
			});

			if(result.length > 0){
				return result;
			}else{
				throw new Error("Sua pesquisa não gerou resultados. O nome '" + wantedName + "' não está na nossa base de dados.");
			}

		}catch(error){
			console.log(error);
		}
	}

	async readByGenre(wantedGenre: string){
		try{
			const result = await prisma.music.findMany({
				where:{
					genre: wantedGenre
				}
			});

			if(result.length > 0){
				return result;
			}else{
				throw new Error("Sua pesquisa não gerou resultados. O gênero '" + wantedGenre + "' não está na nossa base de dados.");
			}
		}catch(error){
			console.log(error);
		}
	}

	async readByAlbum(wantedAlbum: string){
		try{
			const result = await prisma.music.findMany({
				where:{
					album: wantedAlbum
				}
			});

			if(result.length > 0){
				return result;
			}else{
				throw new Error("Sua pesquisa não gerou resultados. O álbum '" + wantedAlbum + "' não está na nossa base de dados.");
			}
		}catch(error){
			console.log(error);
		}
	}

	async readByAuthorId(wantedAuthorId: number){
		try{
			const result = await prisma.music.findMany({
				where:{
					authorId: wantedAuthorId

				},
			});

			if(result.length > 0){
				return result;
			}else{
				throw new Error("Sua pesquisa não gerou resultados. O ID '" + wantedAuthorId + "' não está na nossa base de dados.");
			}
		}catch(error){
			console.log(error);
		}
	}

	// UPDATE
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