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
			new Error("Não foi possível deletar o artista.")
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