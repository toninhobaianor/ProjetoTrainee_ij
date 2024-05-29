import prisma from "../../../../config/prismaClient";
import {Music} from "@prisma/client";
import {User} from "@prisma/client";

class UserMusicService{
	// CREATE
	async createUserMusic(music: Music, user: User){
		try{
			if (music && user){
				const result = await prisma.user.update({
					data:{
						musics:{
							connect: music
						}
					},
					where:{
						id: user.id,
					}
        
				});

				return result;
            
			}else {
				throw new Error("Erro ao criar relação entre música e usuário");
			}
		}catch(error){
			console.log(error);
		}
	}

	// DELETE
	async deleteUserMusic(music: Music, user: User){
		try{
			if(music && user){
				await prisma.user.update({
					data:{
						musics:{
							disconnect: music
						}
					},
					where:{
						id: user.id,
					}
				});
			}else {
				throw new Error("Erro ao deletar relação entre música e usuário");
			}
		}catch(error){
			console.log(error);
		}
	}

}   


export default new UserMusicService();
