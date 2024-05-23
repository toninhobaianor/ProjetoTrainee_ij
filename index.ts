import UserService from "./src/domains/User/service/Userservice"
import MusicService from "./src/domains/Music/service/MusicService"

async function main(){
  /*const body = {
    id: 0,
    name: "antonio",
    email: "tonin1@gmail.com.br",
    photo: null,
    senha: "confia",
    tem_privilegio: "admin"
  }

  const user = await UserService.create(body);
  console.log(user);*/

  //const email = "tonin1@gmail.com";
  //const user = await UserService.update(email,"senhanova1",3);
  //console.log(user);

  const music = await MusicService.create({
    album: "music",
    authorId: 1,
    genre: "music",
    id: 3,
    name: "music",
  });
  console.log(music);
}

main();