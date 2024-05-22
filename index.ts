import UserService from "./src/domains/User/service/Userservice"
import MusicService from "./src/domains/User/service/MusicService"

async function main(){
  const body = {
    id: 0,
    name: "antonio",
    email: "tonin1@gmail.com.br",
    photo: null,
    senha: "confia",
    tem_privilegio: "admin"
  }

  //const user = await UserService.create(body);
  //console.log(user);

  const music = await MusicService.create({
    album: "xuxa, só as melhores",
    genre: "genero de musica",
    name: "axux",
    authorId: 1,
    id: 1,
  });
  console.log(music);
}

main();