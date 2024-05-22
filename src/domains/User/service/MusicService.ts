import prisma from "../../../../config/prismaClient";
import {Music} from "@prisma/client";

class MusicService{
    async create(body: Music){
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
}

export default new MusicService();