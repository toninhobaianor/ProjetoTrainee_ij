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

  const email = "tonin1@gmail.com";
  const user = await UserService.updateUser(email,"senhanova1",3);
  console.log(user);

  const user1 = await UserService.readUser();
  console.log(user1);

  const user2 = await UserService.deleteUser(email);
  console.log(user2);
  
  const name = "tonin";
  const user3 = await UserService.readbyName(name);
  console.log(user3);

  const user4 = await UserService.readbyEmail(email);
  console.log(user4);

  const user5 = await UserService.readbyIdUser(7);
  console.log(user5);


  //const email = "tonin1@gmail.com";
  //const user = await UserService.update(email,"senhanova1",3);
  //console.log(user);

//----------------------------------------------Testes Musica --------------------------------------------------------------
  
  // ok
  /*
  const newMusic = {
    id: 1, // precia de um id mesmo que não seja o verdadeiro
    album: "album generico",
    authorId: 2,
    genre: "genero generico",
    name: "musica generica 3",
  }

  await MusicService.createMusic(newMusic);
  */

  // ok
  //const readAll = await MusicService.readAll();
  //console.log(readAll);

  // ok
  //const readId = await MusicService.readById(6);
  //console.log(readId);

  // ok
  //const readName = await MusicService.readByName("Boate Azul");
  //console.log(readName);
  
  // ok
  //const naoExiste = await MusicService.readByName("Boate Verde");
  //console.log(naoExiste);

  // ok
  //const readAlbum = await MusicService.readByAlbum("X");
  //console.log(readAlbum);

  // ok
  //const readAuthor = await MusicService.readByAuthorId(2);
  //console.log(readAuthor);

  // ok
  //const readGenre = await MusicService.readByGenre("A");
  //console.log(readGenre);

  // ok
  /*
  const updateMusic = {
    id: 4, 
    album: "album generico",
    authorId: 2,
    genre: "genero generico",
    name: "nova musica generica",
  }
  await MusicService.updateMusic(4, updateMusic);
  */

  // ok
  //await MusicService.deleteMusic(6);

//------------------------------------------------------------------------------------------------------------
}

main();