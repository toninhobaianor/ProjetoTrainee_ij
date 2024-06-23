import prisma from "../../../../config/prismaClient";
import Userservice from "../../User/service/Userservice";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";

class UserMusicService{
	// CREATE
	// falta autenticação e status
	async createUserMusic(musicId: number, userId: number){
		if(isNaN(musicId)){
			throw new InvalidParamError("O parâmetro 'musicId' deve ser um número válido.");
		}
		if(isNaN(userId)){
			throw new InvalidParamError("O parâmetro 'userId' deve ser um número válido.");
		}
		const user = await Userservice.readById(userId);
		if(user){
			const result = await prisma.user.update({
				data:{
					musics:{
						connect: {
							id: musicId,
						}
					}
				},
				where:{
					id: userId,
				},
				include:{
					musics:{
						where:{
							id: musicId,
						}
					}
				}
        
			});

			return result;
            
		}else{
			throw new QueryError("Usuário com ID '" + userId + "' não encontrado.");
		}
		
	}

	// READ
	// falta autenticação e status
	async readUserMusics(userId: number){
		
		if(isNaN(userId)){
			throw new InvalidParamError("O parâmetro 'userId' deve ser um número válido.");
		}
		const user = await Userservice.readById(userId);
		if(user){
			const result = await prisma.user.findMany({
				where:{
					id: userId,
				},
				include:{
					musics: true
				},

			});

			return result;
            
		}else{
			throw new QueryError("Usuário com ID '" + userId + "' não encontrado.");
		}
		
	}

	// DELETE
	// falta autenticação e status
	async deleteUserMusic(musicId: number, userId: number){
		
		if(isNaN(musicId)){
			throw new InvalidParamError("O parâmetro 'musicId' deve ser um número válido.");
		}
		if(isNaN(userId)){
			throw new InvalidParamError("O parâmetro 'userId' deve ser um número válido.");
		}
		const user = await Userservice.readById(userId);
		if(user){
			await prisma.user.update({
				data:{
					musics:{
						disconnect: {
							id: musicId
						}
					}
				},
				where:{
					id: user.id,
				},
				include:{
					musics: true,
				}
			});
		}else {
			throw new QueryError("Usuário com ID '" + userId + "' não encontrado.");
		}
		
	}

}   


export default new UserMusicService();
