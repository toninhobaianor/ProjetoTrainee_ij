import prisma from "../../../../config/prismaClient";
import Userservice from "../../User/service/Userservice";

class UserMusicService{
	// CREATE
	async createUserMusic(music: number, idUser: number){
		try{
			const user = await Userservice.readById(idUser);
			if (user){
				const result = await prisma.user.update({
					data:{
						musics:{
							connect: {
								id: music,
							}
						}
					},
					where:{
						id: idUser,
					},
					include:{
						musics: true
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
	async deleteUserMusic(idMusic: number, idUser: number){
		try{
			const user = await Userservice.readById(idUser);
			if(user){
				await prisma.user.update({
					data:{
						musics:{
							disconnect: {
								id: idMusic
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
				throw new Error("Erro ao deletar relação entre música e usuário");
			}
		}catch(error){
			console.log(error);
		}
	}

}   


export default new UserMusicService();
