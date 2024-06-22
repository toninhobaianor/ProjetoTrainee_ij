import { prismaMock } from "../../../../config/singleton";
import {Music} from "@prisma/client";
import MusicService  from "./MusicService";
import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";

describe("createMusic", () => {
	const music = {
		id: 99, 
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
		authorId: 3
	};
	const invalidMusic = {
		id: 99,
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
	};

	test("deve receber uma música válida ==> cria uma música", async () => {
		prismaMock.music.create.mockResolvedValue(music);

		await expect(MusicService.createMusic(music)).resolves.toEqual({
			id: 99,
			name: "Cobaia",
			genre: "Sertanejo",
			album: "As Melhores",
			authorId: 3
		});
	});

	test("deve receber uma musica com parâmetro inválido ==> gera erro", async () => {
		prismaMock.music.findUnique.mockResolvedValue(null);

		await expect(MusicService.createMusic(invalidMusic as unknown as Music)).rejects.toThrow(new InvalidParamError("Parâmetros inválidos fornecidos."));
	});
});

describe("readAll", () => {
	const musics = [
		{
			id: 1,
			name: "Cobaia",
			genre: "Sertanejo",
			album: "As Melhores",
			authorId: 3
		},
		{
			id: 2,
			name: "Amor de Que",
			genre: "Funk",
			album: "Top Hits",
			authorId: 4
		}
	];

	test("deve ler um banco de dados ==> retornar todas as músicas corretamente", async () => {
		prismaMock.music.findMany.mockResolvedValue(musics);

		const result = await MusicService.readAll();
		expect(result).toEqual(musics);
	});

	test("deve ler um banco sem músicas==> gerar erro", async () => {
		prismaMock.music.findMany.mockResolvedValue([]);

		await expect(MusicService.readAll()).rejects.toThrow(new QueryError("Sua pesquisa não gerou resultados."));
	});
});

describe("readById", () =>{
	const music = {
		id: 99,
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
		authorId: 3
	};

	test("deve ler um id inexistente ==> gera erro", async () => {
		prismaMock.music.findUnique.mockResolvedValue(null);

		await expect(MusicService.readById(music.id)).rejects.toThrow(new QueryError("Sua pesquisa não gerou resultados. O ID '" + music.id + "' não está na nossa base de dados."));
	});

	test("deve ler um id que não é um número ==> gera erro", async () => {
		const invalidId = "invalid_id";

		await expect(MusicService.readById(invalidId as unknown as number)).rejects.toThrow(new InvalidParamError("O parâmetro deve ser um número."));
	});

	test("deve ler um id válido ==> retornar a música correta com o id informado", async () => {
		prismaMock.music.findUnique.mockResolvedValue(music);

		const result = await MusicService.readById(music.id);
		expect(result).toEqual(music);
	});
});

describe("readByName", () => {
	const music = {
		id: 99,
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
		authorId: 3
	};

	test("deve ler um nome inexistente ==> gera erro", async () => {
		prismaMock.music.findMany.mockResolvedValue([]);

		await expect(MusicService.readByName(music.name)).rejects.toThrow(new QueryError("Sua pesquisa não gerou resultados. O nome '" + music.name + "' não está na nossa base de dados."));
	});

	test("deve ler um nome vazio ==> gera erro", async () => {
		await expect(MusicService.readByName("")).rejects.toThrow(new InvalidParamError("O parâmetro não pode ser uma string vazia."));
	});

	test("deve ler um nome válido ==> retornar a música correta com o nome informado", async () => {
		prismaMock.music.findMany.mockResolvedValue([music]);

		const result = await MusicService.readByName(music.name);
		expect(result).toEqual([music]);
	});
});

describe("readByGenre", () => {
	const music = {
		id: 99,
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
		authorId: 3
	};

	test("deve ler um genero inexistente ==> gera erro", async () => {
		prismaMock.music.findMany.mockResolvedValue([]);

		await expect(MusicService.readByGenre(music.genre)).rejects.toThrow(new QueryError("Sua pesquisa não gerou resultados. O gênero '" + music.genre + "' não está na nossa base de dados."));
	});

	test("deve ler um gênero vazio ==> gera erro", async () => {
		await expect(MusicService.readByGenre("")).rejects.toThrow(new InvalidParamError("O parâmetro não pode ser uma string vazia."));
	});

	test("deve ler um gÊnero válido ==> retornar a música correta com o gênero informado", async () => {
		prismaMock.music.findMany.mockResolvedValue([music]);

		const result = await MusicService.readByGenre(music.genre);
		expect(result).toEqual([music]);
	});
});

describe("readByAlbum", () => {
	const music = {
		id: 99,
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
		authorId: 3
	};

	test("deve ler um album inexistente ==> gera erro", async () => {
		prismaMock.music.findMany.mockResolvedValue([]);

		await expect(MusicService.readByAlbum(music.album)).rejects.toThrow(new QueryError("Sua pesquisa não gerou resultados. O álbum '" + music.album + "' não está na nossa base de dados."));
	});

	test("deve ler um álbum vazio ==> gera erro", async () => {
		await expect(MusicService.readByAlbum("")).rejects.toThrow(new InvalidParamError("O parâmetro não pode ser uma string vazia."));
	});

	test("deve ler um album válido ==> retornar a música correta com o álbum informado", async () => {
		prismaMock.music.findMany.mockResolvedValue([music]);

		const result = await MusicService.readByAlbum(music.album);
		expect(result).toEqual([music]);
	});
});

describe("readByAuthorId", () => {
	const musics = [
		{
			id: 99,
			name: "Cobaia",
			genre: "Sertanejo",
			album: "As Melhores",
			authorId: 1
		},
		{
			id: 100,
			name: "Cobaia 2",
			genre: "Sertanejo 2",
			album: "As Melhores",
			authorId: 1
		}
	];
	test("deve ler um id inexistente ==> gera erro", async () => {
		prismaMock.music.findUnique.mockResolvedValue(null);

		await expect(MusicService.readByAuthorId(2)).rejects.toThrow(new QueryError("Sua pesquisa não gerou resultados. O ID '" + 2 + "' não está na nossa base de dados."));
	});

	test("deve ler um id que não é um número ==> gera erro", async () => {
		const invalidId = "invalid_id";

		await expect(MusicService.readByAuthorId(invalidId as unknown as number)).rejects.toThrow(new InvalidParamError("O parâmetro deve ser um número."));
	});

	test("deve ler um id válido ==> retornar a música correta com o id informado", async () => {
		prismaMock.music.findMany.mockResolvedValue(musics);

		const result = await MusicService.readByAuthorId(1);
		expect(result).toEqual(musics);
	});
});

describe("updateMusic", () => {
	const music = {
		id: 99, 
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
		authorId: 3
	};

	test("deve ler um parâmetro inválido (id) ==> gera erro", async () => {
		prismaMock.music.findUnique.mockResolvedValue(null);
		const invalidId = "invalid_id";

		await expect(MusicService.updateMusic(invalidId as unknown as number, music)).rejects.toThrow(new InvalidParamError("O parâmetro deve ser um número."));
	});

	test("deve ler uma música inexistente ==> gera erro", async () => {
		prismaMock.music.findUnique.mockResolvedValue(null);

		await expect(MusicService.updateMusic(99, music)).rejects.toThrow(new QueryError("Sua pesquisa não gerou resultados. O ID '" + 99 + "' não está na nossa base de dados."));
	});

	test("deve atualizar uma música por id ==> atualiza a música com o id informado", async () => {
		prismaMock.music.findUnique.mockResolvedValue(music);

		await MusicService.updateMusic(99, music);

		const newMusic = MusicService.readById(99);
		await expect(newMusic).resolves.toEqual(music);

	});

});

describe("deleteMusic", () => {
	const music = {
		id: 99, 
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
		authorId: 3
	};

	test("deve ler um parâmetro inválido (id) ==> gera erro", async () => {
		prismaMock.music.findUnique.mockResolvedValue(null);
		const invalidId = "invalid_id";

		await expect(MusicService.deleteMusic(invalidId as unknown as number)).rejects.toThrow(new InvalidParamError("O parâmetro deve ser um número."));
	});

	test("deve tentar deletar uma música inexistente ==> gera erro", async () => {
		prismaMock.music.findUnique.mockResolvedValue(null);

		await expect(MusicService.deleteMusic(99)).rejects.toThrow(new QueryError("Sua pesquisa não gerou resultados. O ID '" + 99 + "' não está na nossa base de dados."));
	});

	test("deve deletar uma música por id ==> deleta a música com o id informado", async () => {
		prismaMock.music.findUnique.mockResolvedValue(music);

		await expect(MusicService.deleteMusic(99)).resolves.toEqual(undefined);

	});
});