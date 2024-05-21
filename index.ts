import UserService from "./src/domains/User/service/Userservice"

async function main(){
  const body = {
    id: 0,
    name: "antonio",
    email: "tonin1@gmail.com.br",
    photo: null,
    senha: "confia",
    tem_privilegio: "admin"
  }

  const user = await UserService.create(body);
  console.log(user);
}

main();