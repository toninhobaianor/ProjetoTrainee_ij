import prisma from "../../../../config/prismaClient";
import {User} from "@prisma/client";

class UserService{
  async createUser(body: User){
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

  async updateUser(busca: string,novoAtributo: string,op: number){
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

  async readUser(){
    const user = await prisma.user.findMany();
    try{
      if(user.length == 0){
        throw new Error('A lista de usuarios esta vazia');
      }
      else{
        return user;
      }
    }
    catch(error){
      console.log(error);
    }
  }

  async readbyName(wantedName:string){
    const wanteds = await prisma.user.findMany({
      where: { name: wantedName },
    });
    try{
      if(wanteds.length == 0){
        throw new Error('Não existe ninguem com este nome na nossa base de dados');
      }
      else{
        return wanteds;
      }
    }
    catch(error){
      console.log(error);
    }
  }

  async readbyEmail(wantedEmail:string){
    const wanted = await prisma.user.findUnique({
      where: { email: wantedEmail },
    });
    try{
      if(wanted == null){
        throw new Error('Não existe este email na nossa base de dados');
      }
      else{
        return wanted;
      }
    }
    catch(error){
      console.log(error);
    }
  }

  async readbyIdUser(wantedId:number){
    const wanted = await prisma.user.findUnique({
      where: { id: wantedId },
    });
    try{
      if(wanted == null){
        throw new Error('Não existe nenhum Usuario com este Id na nossa base de dados');
      }
      else{
        return wanted;
      }
    }
    catch(error){
      console.log(error);
    }
  }

  async deleteUser(proc: string){
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
        throw new Error('O email informado para deletar não existe!');
      }
    }
    catch(error){
      console.log(error);
    }
  }

}

export default new UserService();