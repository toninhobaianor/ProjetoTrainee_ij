import prisma from "../../../../config/prismaClient";
import {UserMusic} from "@prisma/client";
import {Music} from "@prisma/client";
import {User} from "@prisma/client";

class UserMusicService{
    // CREATE
    async createUserMusic(music: Music, user: User){
        try{
            if (music && user) {
                const result = await prisma.userMusic.create({
                    data:{
                        music:{
                            connect:{
                                id: music.id,
                            }
                            
                        },
                        user:{
                            connect:{
                                id: user.id,
                            }
                        },
                    },
        
                });
                return result;
              } else {
                throw new Error("Erro ao criar user ou music");
              }
        }catch(error){
            console.log(error)
        }
    }

    // READ
    async readAll(){
        try{
            const result = await prisma.userMusic.findMany({
                include:{
                    user: true,
                    music: true,
                }
            });

            if(result.length > 0){
                return result;
            }else{
                throw new Error("Sua pesquisa não gerou resultados.");
            }
        }catch(error){
            console.log(error)
        }
        
    }

    async readByMusicId(musicId: number){
        try{
            const result = await prisma.userMusic.findUnique({
                where:{
                    musicId: musicId
                }
            });

            if(result){
                return result;
            }else{
                throw new Error("Sua pesquisa não gerou resultados. O ID '" + musicId + "' não está na nossa base de dados.");
            }
        }catch(error){
            console.log(error)
        }
    }

    async readByUserId(wantedUserId: number){
        try{
            const result = await prisma.userMusic.findMany({
                where:{
                    userId: wantedUserId
                },
            });

            if(result.length > 0){
                return result;
            }else{
                throw new Error("Sua pesquisa não gerou resultados. O ID '" + wantedUserId + "' não está na nossa base de dados.");
            }
        }catch(error){
            console.log(error)
        }
    }

    // UPDATE
    async updateUserMusicByMusicId(id: number, music: Music, user: User){
        try{
            const userMusic = await this.readByMusicId(id);

            if(userMusic){
                const newMusic = await prisma.userMusic.update({
                    data:{
                        musicId: music.id,
                        userId: user.id,
                    }, 
                    where:{
                        musicId: id,
                    }
                });

                return newMusic;
            }else{
                throw new Error("Não foi possível atualizar seu UserMusic.");
            }

        }catch(error){
            console.log(error);
        }
    }

    async updateUserMusicByUserId(id: number, music: Music, user: User){
        try{
            const userMusic = await this.readByMusicId(id);

            if(userMusic){
                const newMusic = await prisma.userMusic.update({
                    data:{
                        musicId: music.id,
                        userId: user.id,
                    }, 
                    where:{
                        userId: id,
                    }
                });

                return newMusic;
            }else{
                throw new Error("Não foi possível atualizar seu UserMusic.");
            }

        }catch(error){
            console.log(error);
        }
    }

    // DELETE
    async deleteUserMusicByUserId(wantedId: number){
        try{
            const music = await this.readByUserId(wantedId);

            if(music){
                await prisma.userMusic.delete({
                    where:{
                        userId: wantedId,
                    }
                })
            }else{
                throw new Error("Não foi possível deletar a UserMusic.")
            }
        }catch(error){
            console.log(error);
        }
    }

}

export default new UserMusicService();
