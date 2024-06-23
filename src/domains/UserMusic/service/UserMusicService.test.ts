import { prismaMock } from "../../../../config/singleton";
import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import UserMusicService from "./UserMusicService";

describe("createUserMusic", () => {
	const user = {
		id: 99,
		name: "Tata",
		email: "oTataEhFoda@gmail.com",
		senha: "otatatemMoto123",
		tem_privilegio: "admin",
		photo: null
	};

	const music = {
		id: 99,
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
		authorId: 3
	};

	test("deve receber um parâmetro inválido (musicId) ==> gera erro", async () => {
		const invalidId = "invalid_id";

		await expect(UserMusicService.createUserMusic(invalidId as unknown as number, user.id)).rejects.toThrow(new InvalidParamError("O parâmetro 'musicId' deve ser um número válido."));
	});

	test("deve receber um parâmetro inválido (userId) ==> gera erro", async () => {
		const invalidId = "invalid_id";

		await expect(UserMusicService.createUserMusic(1, invalidId as unknown as number)).rejects.toThrow(new InvalidParamError("O parâmetro 'userId' deve ser um número válido."));
	});

	test("deve ler um id de usuário inexistente e tentar criar uma relação ==> gera erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(UserMusicService.createUserMusic(2,user.id)).rejects.toThrow(new QueryError("Usuário com ID '" + user.id + "' não encontrado."));
	});

	test("deve ler musicId e userId válidos ==> cria relação entre user e music", async () => {
		prismaMock.music.findUnique.mockResolvedValue(music);
		prismaMock.user.findUnique.mockResolvedValue(user);

		await expect(UserMusicService.createUserMusic(music.id, user.id)).resolves.toEqual(undefined);
	});
});

describe("readUserMusic", () => {
	const user = {
		id: 99,
		name: "Tata",
		email: "oTataEhFoda@gmail.com",
		senha: "otatatemMoto123",
		tem_privilegio: "admin",
		photo: null
	};
    
	test("deve receber um parâmetro inválido (userId) ==> gera erro", async () => {
		const invalidId = "invalid_id";

		await expect(UserMusicService.readUserMusics(invalidId as unknown as number)).rejects.toThrow(new InvalidParamError("O parâmetro 'userId' deve ser um número válido."));
	});

	test("deve ler um id de usuário inexistente e tentar ler a relação ==> gera erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(UserMusicService.readUserMusics(user.id)).rejects.toThrow(new QueryError("Usuário com ID '" + user.id + "' não encontrado."));
	});

	test("deve ler userId válido ==> retorna relação entre user e music com id informado", async () => {
		prismaMock.user.findUnique.mockResolvedValue(user);

		await expect(UserMusicService.readUserMusics(user.id)).resolves.toEqual(undefined);
	});
});

describe("deleteUserMusic", () => {
	const user = {
		id: 99,
		name: "Tata",
		email: "oTataEhFoda@gmail.com",
		senha: "otatatemMoto123",
		tem_privilegio: "admin",
		photo: null
	};

	const music = {
		id: 99,
		name: "Cobaia",
		genre: "Sertanejo",
		album: "As Melhores",
		authorId: 3
	};
    
	test("deve receber um parâmetro inválido (userId) ==> gera erro", async () => {
		const invalidId = "invalid_id";

		await expect(UserMusicService.deleteUserMusic(1, invalidId as unknown as number)).rejects.toThrow(new InvalidParamError("O parâmetro 'userId' deve ser um número válido."));
	});

	test("deve receber um parâmetro inválido (musicId) ==> gera erro", async () => {
		const invalidId = "invalid_id";

		await expect(UserMusicService.deleteUserMusic(invalidId as unknown as number, user.id)).rejects.toThrow(new InvalidParamError("O parâmetro 'musicId' deve ser um número válido."));
	});

	test("deve ler um id de usuário inexistente e tentar deletar a relação ==> gera erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(UserMusicService.deleteUserMusic(2,user.id)).rejects.toThrow(new QueryError("Usuário com ID '" + user.id + "' não encontrado."));
	});

	test("deve ler userId válido ==> deleta relação entre user e music com id informado", async () => {
		prismaMock.music.findUnique.mockResolvedValue(music);
		prismaMock.user.findUnique.mockResolvedValue(user);
	
		await expect(UserMusicService.deleteUserMusic(music.id, user.id)).resolves.toEqual(undefined);
	});
});