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

   async update(busca: string,novoAtributo: string,op: number){
    if(op == 1){
      const result = await prisma.user.update({
        where: {
          email: busca,
        },
        data: {
          name: novoAtributo,
        },
      });
      return result;
    }
    else if(op == 2){
      const result = await prisma.user.update({
        where: {
          email: busca,
        },
        data: {
          photo: novoAtributo,
        },
      });
      return result;
    }
    else{
      const result = await prisma.user.update({
        where: {
          email: busca,
        },
        data: {
          senha: novoAtributo,
        },
      });
      return result;
    }
    
  }
}

export default new UserService();