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

//----------------------------------------------Testes Musica --------------------------------------------------------------
  // ok
  //const readAll = await MusicService.readAll();
  //console.log(readAll);

  // ok
  //const readId = await MusicService.readById(6);
  //console.log(readId);

  // ok
  //const readName = await MusicService.readByName("Boate Azul");
  //console.log(readName);
  
  //
  //const naoExiste = await MusicService.readByName("Boate Verde");
  //console.log(naoExiste);

  // ok
  //const readAlbum = await MusicService.readByAlbum("X");
  //console.log(readAlbum);

  //
  //const readAuthor = await MusicService.readByAuthorId(2);
  //console.log(readAuthor);

  //
  //const readGenre = await MusicService.readByGenre("A");
  //console.log(readGenre);

//------------------------------------------------------------------------------------------------------------

}

main();