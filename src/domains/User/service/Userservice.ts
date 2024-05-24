import prisma from "../../../../config/prismaClient";
import {User} from "@prisma/client";

class UserService{
  async create(body: User){
    const condicao = await prisma.user.findUnique({
      where: { email: body.email },
    });
    try{
      if(condicao != null){
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
      else{
        throw new Error("Não foi possivel realizar o cadastro pois o email ja existe");
      }
     }
    catch(error){
      console.log(error);
    }
  }

   async update(busca: string,novoAtributo: string,op: number){
    const condicao = await prisma.user.findUnique({
      where: { email: busca },
    });
    try{
      if(condicao != null){
        if(op == 1){
          const user = await prisma.user.update({
            where: {
              email: busca,
            },
            data: {
              name: novoAtributo,
            },
          });
          return user;
        }
        else if(op == 2){
          const user = await prisma.user.update({
            where: {
              email: busca,
            },
            data: {
              photo: novoAtributo,
            },
          });
          return user;
        }
        else{
          const user = await prisma.user.update({
            where: {
              email: busca,
            },
            data: {
              senha: novoAtributo,
            },
          });
          return user;
        }
      }
      else{
        throw new Error('Não foi possivel realizar a atualização pois email passado não existe!');
      }
    }
    catch(error){
      console.log(error)
    }
  }
}

export default new UserService();