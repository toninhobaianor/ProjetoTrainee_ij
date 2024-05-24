import prisma from "../../../../config/prismaClient";
import {User} from "@prisma/client";

class UserService{
  async create(body: User){
    const condicao = await prisma.user.findUnique({
      where: { email: body.email },
    });
    try{
      if(condicao == null){
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
        throw new Error("Não foi possivel realizar o cadastro pois o email já existe");
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
        switch(op){
          case 1:
            const user = await prisma.user.update({
              where: {
                email: busca,
              },
              data: {
                name: novoAtributo,
              },
            });
            return user;
            break;
          case 2:
            const user1 = await prisma.user.update({
              where: {
                email: busca,
              },
              data: {
                photo: novoAtributo,
              },
            });
            return user1;
            break;
          case 3:
            const user2 = await prisma.user.update({
              where: {
                email: busca,
              },
              data: {
                senha: novoAtributo,
              },
            });
            return user2;
            break;
          default:
            throw new Error("Não existe esta opção");
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

  async read(){
    const result = await prisma.user.findMany();
    try{
      if(result.length == 0){
        throw new Error('O banco de dados esta vazio');
      }
      else{
        return result;
      }
    }
    catch(error){
      console.log(error);
    }
  }

  async delete(proc: string){
    const condicao = await prisma.user.findUnique({
        where: { email: proc },
      });
    try{
      if(condicao != null){
        const result = await prisma.user.delete({
          where: {
            email: proc,
          },
        });
        return result;
      }
      else{
        throw new Error('O email informado não existe!');
      }
    }
    catch(error){
      console.log(error);
    }
  }

}

export default new UserService();