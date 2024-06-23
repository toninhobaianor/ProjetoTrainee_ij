import { Author } from "@prisma/client";
import { prismaMock } from "../../../../config/singleton";
import AuthorService from "./AuthorService";


describe("createAuthor", () => {
	const author = {
		id: 100, 		
		Author: "Artista teste",
		StreamCount: 1000,
		photo: null
	};
	const invalidAuthor = {
		id: 100,	
		StreamCount: 1000,
		photo: null
	};

	test("Deve receber um Artista válido => cria o Artista", async() => {
		prismaMock.author.create.mockResolvedValue(author);

		await expect(AuthorService.createArtist(author)).resolves.toEqual({
			id: 100,
			Author: "Artista teste",
			StreamCount: 1000,
			photo: null
		});
	});

	test("tenta criar artista com parametro errado ==> gera erro", async () => {
		prismaMock.author.findUnique.mockResolvedValue(null);

		await expect(AuthorService.createArtist(invalidAuthor as unknown as Author)).rejects.toThrow(
			new Error("Parâmetros inválidos fornecidos.")
		);
		expect(prismaMock.author.delete).not.toHaveBeenCalled();
	});
});

describe("readAll", () => {
	const artists = [
		{
			id: 1, 		
			Author: "Artista teste",
			StreamCount: 1000,
			photo: null,
			musics: [
				{
					id: 1,
					name: "Musica 1",
					genre: "Sertanejo",
					album: "As Melhores",
					authorId: 1
				},
				{
					id: 2,
					name: "Musica 2",
					genre: "Funk",
					album: "Top Hits",
					authorId: 1
				}
			]
		},
		{
			id: 2, 		
			Author: "Artista teste 2",
			StreamCount: 10000,
			photo: null,
			musics: [
				{
					id: 3,
					name: "Musica teste 3",
					genre: "Sertanejo",
					album: "As Melhores",
					authorId: 2
				},
				{
					id: 4,
					name: "Musica teste 4",
					genre: "Funk",
					album: "Top Hits",
					authorId: 2
				}
			]
		}
	];

	test("deve ler as informações do banco de dados ==> retornar todas as informações dos artistas corretamente", async () => {
		prismaMock.author.findMany.mockResolvedValue(artists);
		const result = await AuthorService.readAll();
		expect(result).toEqual(artists);
	});

	test("deve ler um banco sem artistas==> gerar erro", async () => {
		prismaMock.author.findMany.mockResolvedValue([]);

		await expect(AuthorService.readAll()).rejects.toThrow(
			new Error("Sua pesquisa não gerou resultados."));
	});
});

describe("ReadByID", () => {
	const artist = 
		{
			id: 1, 		
			Author: "Artista teste",
			StreamCount: 1000,
			photo: null,
			musics: [
				{
					id: 1,
					name: "Musica 1",
					genre: "Sertanejo",
					album: "As Melhores",
					authorId: 1
				},
				{
					id: 2,
					name: "Musica 2",
					genre: "Funk",
					album: "Top Hits",
					authorId: 1
				}
			]
		};

	test("deve ler as informações do banco de dados através de um ID ==> retornar as informações dos artistas corretamente pelo ID", async () => {
		prismaMock.author.findUnique.mockResolvedValue(artist);
		const result = await AuthorService.ReadByID(artist.id);
		expect(result).toEqual(artist);
	});
	test("deve ler um id de um artista que nao esteja no banco ==> gerar erro", async () => {
		prismaMock.author.findUnique.mockResolvedValue(null);
		
		await expect(AuthorService.ReadByID(artist.id)).rejects.toThrow(
			new Error("Sua pesquisa não gerou resultados. O ID: '" + artist.id + "' não está na nossa base de dados."));

	});

	test("deve ler um id que nao seja numero ==> gerar erro", async () => {
		const invalidId = "invalid_id";
		
		await expect(AuthorService.ReadByID(invalidId as unknown as number)).rejects.toThrow(
			new Error("O parâmetro deve ser um número."));

	});
});


describe("ReadByMusic", () => {
	const artist = 
		{
			id: 1, 		
			Author: "Artista teste",
			StreamCount: 1000,
			photo: null,
			musics: [
				{
					id: 1,
					name: "Musica 1",
					genre: "Sertanejo",
					album: "As Melhores",
					authorId: 1
				},
				{
					id: 2,
					name: "Musica 2",
					genre: "Funk",
					album: "Top Hits",
					authorId: 1
				}
			]
		};

	test("deve ler o nome de uma música ==> retornar as informações dos artistas dono da musica corretamente", async () => {
		prismaMock.author.findMany.mockResolvedValue([artist]);
		
		const result = await AuthorService.ReadByMusic(artist.musics[0].name);
		expect(result).toEqual([artist]);
	});

	test("deve ler o nome de uma  musica que nao esteja no banco ==> gerar erro", async () => {
		prismaMock.author.findFirst.mockResolvedValue(null);
		
		await expect(AuthorService.ReadByMusic(artist.musics[1].name)).rejects.toThrow(
			new Error("Sua pesquisa não gerou resultados. A música: '" + artist.musics[1].name + "' não está na nossa base de dados."));

	});

	test("deve ler um nome em branco ==> gerar erro", async () => {
		prismaMock.author.findFirst.mockResolvedValue(null);
		
		await expect(AuthorService.ReadByMusic("")).rejects.toThrow(
			new Error("O parâmetro não pode ser uma string vazia."));

	});
});



describe("ReadByIDMusic", () => {
	const artist = 
		{
			id: 1, 		
			Author: "Artista teste",
			StreamCount: 1000,
			photo: null,
			musics: [
				{
					id: 1,
					name: "Musica 1",
					genre: "Sertanejo",
					album: "As Melhores",
					authorId: 1
				},
				{
					id: 2,
					name: "Musica 2",
					genre: "Funk",
					album: "Top Hits",
					authorId: 1
				}
			]
		};

	test("deve ler o ID de uma música ==> retornar as informações dos artistas dono da musica corretamente", async () => {
		prismaMock.author.findFirst.mockResolvedValue(artist);
		
		const result = await AuthorService.ReadByIDMusic(artist.musics[0].id);
		expect(result).toEqual(artist);
	});

	test("deve ler um id de uma  musica que nao esteja no banco ==> gerar erro", async () => {
		prismaMock.author.findFirst.mockResolvedValue(null);
		
		await expect(AuthorService.ReadByIDMusic(artist.musics[1].id)).rejects.toThrow(
			new Error("Sua pesquisa não gerou resultados. O ID: '" + artist.musics[1].id + "' não está na nossa base de dados."));

	});

	test("deve ler um id que nao seja numero ==> gerar erro", async () => {
		const invalidId = "invalid_id";
		
		await expect(AuthorService.ReadByIDMusic(invalidId as unknown as number)).rejects.toThrow(
			new Error("O parâmetro deve ser um número."));

	});
});

describe("UpdateArtist", () => {
	const artist = 
		{
			id: 10, 		
			Author: "Artista teste",
			StreamCount: 1000,
			photo: null,
			musics: [
				{
					id: 1,
					name: "Musica 1",
					genre: "Sertanejo",
					album: "As Melhores",
					authorId: 1
				},
				{
					id: 2,
					name: "Musica 2",
					genre: "Funk",
					album: "Top Hits",
					authorId: 1
				}
			]
		};
	const invalidAuthor = {
		id: 100,	
		StreamCount: 1000,
		photo: null
	};

	test("deve ler o ID de um Artista ==> Atualiza as informações do artista", async () => {
		prismaMock.author.findUnique.mockResolvedValue(artist);

		await AuthorService.updateArtist(10, artist);
		
		const result = await AuthorService.ReadByID(10);
		expect(result).toEqual(artist);
	});



	test("deve ler um id de um artista que nao esteja no banco ==> gerar erro", async () => {
		prismaMock.author.findUnique.mockResolvedValue(null);
		
		await expect(AuthorService.updateArtist(artist.id, artist)).rejects.toThrow(
			new Error("Sua pesquisa não gerou resultados. O ID: '" + artist.id + "' não está na nossa base de dados."));

	});

	test("deve ler um id que nao seja numero ==> gerar erro", async () => {
		const invalidId = "invalid_id";
		
		await expect(AuthorService.updateArtist(invalidId as unknown as number, artist)).rejects.toThrow(
			new Error("O parâmetro deve ser um número."));

	});

	test("tenta atualizar artista com parametro errado ==> gera erro", async () => {
		prismaMock.author.findUnique.mockResolvedValue(null);

		await expect(AuthorService.createArtist(invalidAuthor as unknown as Author)).rejects.toThrow(
			new Error("Parâmetros inválidos fornecidos.")
		);
		expect(prismaMock.author.delete).not.toHaveBeenCalled();
	});


});

describe("deleteAuthor", () => {
	const author = {
		id: 100, 		
		Author: "Artista teste",
		StreamCount: 1000,
		photo: null
		
	};
	test("deve ler um parâmetro inválido (id) ==> gera erro", async () => {
		prismaMock.author.findUnique.mockResolvedValue(null);
		const invalidId = "invalid_id";

		await expect(AuthorService.deleteArtist(invalidId as unknown as number)).rejects.toThrow(
			new Error("O parâmetro deve ser um número.")
		);

		expect(prismaMock.author.findUnique).not.toHaveBeenCalled();
		expect(prismaMock.author.delete).not.toHaveBeenCalled();
	});

	test("tenta deletar artista inexistente ==> gera erro", async () => {
		prismaMock.author.findUnique.mockResolvedValue(null);
		await expect(AuthorService.deleteArtist(0)).rejects.toThrow(
			new Error("Sua pesquisa não gerou resultados. O ID: '0' não está na nossa base de dados.")
		);

		expect(prismaMock.author.findUnique).toHaveBeenCalledWith({ where: { id: 0 } });
		expect(prismaMock.author.delete).not.toHaveBeenCalled();
	});

	test("tenta deletar artista existente ==> deleta artista", async () => {
		prismaMock.author.findUnique.mockResolvedValue(author);
		await expect(AuthorService.deleteArtist(99)).resolves.toEqual(undefined);

		expect(prismaMock.author.findUnique).toHaveBeenCalledWith({ where: { id: 99 } });
		expect(prismaMock.author.delete).toHaveBeenCalledTimes(1);
	});
});