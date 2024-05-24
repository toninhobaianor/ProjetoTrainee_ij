import { Author } from '@prisma/client';
import UserService from "./src/domains/User/service/Userservice"
import MusicService from "./src/domains/Music/service/MusicService"
import AuthorService from "./src/domains/Author/service/AuthorService"

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

//----------------------------------------------Testes Artista --------------------------------------------------------------
/*
const body = {
  id: 0,
  Author: "Gusttavo Lima",
  photo: null,
  StreamCount: 1000000,
}

const Artist = await AuthorService.createArtist(body);
console.log(Artist); 
//{ id: 3, Author: 'Gusttavo Lima', StreamCount: 1000000, photo: null } 
//ok

const readAll = await AuthorService.readAll();
console.log(readAll);
//  { id: 3, Author: 'Gusttavo Lima', StreamCount: 1000000, photo: null },
//  { id: 1, Author: '', StreamCount: 0, photo: null },
//  { id: 2, Author: '', StreamCount: 0, photo: null }

//ok

const readId = await AuthorService.ReadByID(3);
console.log(readId);
const readId2 = await AuthorService.ReadByID(4);
console.log(readId2);
//{ id: 3, Author: 'Gusttavo Lima', StreamCount: 1000000, photo: null }
//Error: Sua pesquisa não gerou resultados. O ID: '4' não está na nossa base de dados.
//ok

const newMusic = {
  id: 1, // precia de um id mesmo que não seja o verdadeiro
  album: "Gusttavo Lima e Você",
  authorId: 3,
  genre: "Sertanejo",
  name: "Tchê Tchê Rere",
}
await MusicService.createMusic(newMusic);

const readAuthorMusic = await AuthorService.ReadByMusic("Tchê Tchê Rere");
console.log(readAuthorMusic);
//{ id: 3, Author: 'Gusttavo Lima', StreamCount: 1000000, photo: null }
//ok


const readAuthorIDMusic = await AuthorService.ReadByIDMusic(7);
console.log(readAuthorIDMusic);
//{ id: 3, Author: 'Gusttavo Lima', StreamCount: 1000000, photo: null }
//ok

const updateArtist = {
  id: 1, 
  Author: "MILIONÁRIO E JOSE RICO",
  photo: null,
  StreamCount: 70000000,
}
await AuthorService.updateArtist(1, updateArtist);
// {
// id: 1,
//  Author: 'MILIONÁRIO E JOSE RICO',
//  StreamCount: 70000000,
//  photo: null
// }
//ok 

*/

//await AuthorService.deleteArtist(2);
//ok






}

main();