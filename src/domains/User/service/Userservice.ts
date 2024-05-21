import prisma from "../../../../config/prismaClient";
import {User} from "@prisma/client";

class UserService{
   async create(body: User){
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
}

export default new UserService();