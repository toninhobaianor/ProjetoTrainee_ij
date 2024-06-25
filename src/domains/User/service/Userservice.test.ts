import { prismaMock } from "../../../../config/singleton";
import { User } from "@prisma/client";
import Userservice  from "./Userservice";
import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";

describe("criação de usuario", () => {
	const user = {
		id: 0, 
		name: "sergio",
		email:"Ant@gmail.com" ,
        senha: "12345",
        tem_privilegio:"admim",
        photo:"imagem.png",
	};

	const userinvalido = {
		id: 0, 
		name: "sergio",
		email: null,
        senha: "12345",
        tem_privilegio:"admim",
        photo:"imagem.png",
	};

	test("deve receber um usuário válido ==> cria um usuário", async () => {
		prismaMock.user.create.mockResolvedValue(user);

		await expect(Userservice.createUser(user)).resolves.toEqual({
            id: 0, 
            name: "sergio",
            email:"Ant@gmail.com" ,
            senha: "12345",
            tem_privilegio:"admim",
            photo:"imagem.png",
		});
	});

	test("deve receber um usuário com parâmetro inválido ==> deve gerar um erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(Userservice.createUser(userinvalido as unknown as User)).rejects.toThrow(
            new InvalidParamError("O campo 'email' é obrigatório.")
        );
	});

});


describe("leitura de dados dos Usuários", () => {
    const user = {
		id: 0, 
		name: "sergio",
		email:"Ant@gmail.com" ,
        senha: "12345",
        tem_privilegio:"admim",
        photo:"imagem.png",
	};

	const users = [
		{
            id: 0, 
		    name: "carlos",
		    email: "carlosandre@gmail.com",
            senha: "12345",
            tem_privilegio:"admim",
            photo:"imagem.png",
			
		},
		{
			id: 1, 
		    name: "sergio",
		    email: "sergiomarques@gmail.com",
            senha: "12345678",
            tem_privilegio:"user",
            photo: null,
		}
	];

    //readUser
	test("deve ler do banco de dados ==> retornar todos os usuários", async () => {
		prismaMock.user.findMany.mockResolvedValue(users);

		const result = await Userservice.readUser();
		expect(result).toEqual(users);
	});

	test("deve ler do banco de dados vazio ==> deve gerar um erro", async () => {
		prismaMock.user.findMany.mockResolvedValue([]);

		await expect(Userservice.readUser()).rejects.toThrow(
            new QueryError("A lista de usuarios esta vazia.")
        );
	});

    //readbyid
    test("deve ler um id inexistente ==>deve gerar um erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(Userservice.readById(user.id)).rejects.toThrow(
            new InvalidParamError("Sua pesquisa não gerou resultados. O ID '" + user.id + "' não está na nossa base de dados.")
        );
	});

	test("deve ler um id de um usuário válido ==> retornar um usuário com o id informado", async () => {
		prismaMock.user.findUnique.mockResolvedValue(user);

		const result = await Userservice.readById(user.id);
		expect(result).toEqual(user);
	});

    // readbyname
    test("deve ler um nome de usuário inexistente ==>deve gerar um erro", async () => {
		prismaMock.user.findMany.mockResolvedValue([]);

		await expect(Userservice.readbyName(user.name)).rejects.toThrow(
            new InvalidParamError("Não existe ninguem com este nome na nossa base de dados")
        );
	});

	test("deve ler um nome de um usuário válido ==> retornar os usuários com o nome informado", async () => {
		prismaMock.user.findMany.mockResolvedValue([user]);

		const result = await Userservice.readbyName(user.name);
		expect(result).toEqual([user]);
	});

    //readbyemail
    test("deve ler um email de usuário inexistente ==>deve gerar um erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(Userservice.readbyEmail(user.email)).rejects.toThrow(
            new InvalidParamError("Não existe este email na nossa base de dados")
        );
	});

	test("deve ler um email de usuário válido ==> retornar o usuário com o email correspondente", async () => {
		prismaMock.user.findUnique.mockResolvedValue(user);

		const result = await Userservice.readbyEmail(user.email);
		expect(result).toEqual(user);
	});
});

describe("Atualizandos os dados do Usuário", () => {
	const user = {
		id: 0, 
		name: "sergio",
		email:"Ant@gmail.com" ,
        senha: "12345",
        tem_privilegio:"admim",
        photo:"imagem.png",
	};

	//ATUALIZANDO O NOME DO USUARIO
	test("deve ler um usuário inexistente ==> deve gerar um erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(Userservice.updateNameUser("andre", user)).rejects.toThrow(
            new InvalidParamError("Não existe este email na nossa base de dados")
        );
	});

	test("deve atualizar o nome de um usuário ==> atualiza o nome do usuário", async () => {
		prismaMock.user.findUnique.mockResolvedValue(user);

		const updateuser = await Userservice.updateNameUser("andre", user);

		const newuser = Userservice.readById(user.id);
		await expect(newuser).resolves.not.toEqual(updateuser);

	});
    
	//ATUALIZANDO A SENHA DO USUARIO
    test("deve ler um usuário inexistente ==> deve gerar um erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(Userservice.updatePasswordUser("12345690", user)).rejects.toThrow(
            new InvalidParamError("Não existe este email na nossa base de dados")
        );
	});

	test("deve atualizar a senha de um usuário ==> atualiza a senha do usuário", async () => {
		prismaMock.user.findUnique.mockResolvedValue(user);

		const updateuser = await Userservice.updatePasswordUser("123456", user);

		const newuser =  Userservice.readById(user.id);
		await expect(newuser).resolves.not.toEqual(updateuser);

	});
    
	//ATUALIZANDO O EMAIL DO USUARIO
    test("deve ler um usuário inexistente ==> deve gerar um erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(Userservice.updateEmailUser("andre@gmail.com", user)).rejects.toThrow(
            new InvalidParamError("Não existe este email na nossa base de dados")
        );
	});

	test("deve atualizar o email de um usuário ==> atualiza o email do usuário", async () => {
		prismaMock.user.findUnique.mockResolvedValue(user);

		const updateuser = await Userservice.updateEmailUser("andre@gmail.com", user);

		const newuser = Userservice.readById(user.id);
		await expect(newuser).resolves.not.toEqual(updateuser);

	});
    
});

describe("deletando os Usuários", () => {
	const user = {
		id: 0, 
		name: "sergio",
		email:"Ant@gmail.com" ,
        senha: "12345",
        tem_privilegio:"admim",
        photo:"imagem.png",
	};

	//DELETA UM USUARIO A PARTIR DO EMAIL
	test("deve tentar deletar um usuário inexistente ==> deve gerar um erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(Userservice.deleteUser("carlosandre@gmail.com")).rejects.toThrow(
            new InvalidParamError("Não existe este email na nossa base de dados")
        );
	});

	test("deve deletar um usuário por email ==> deleta o usuário com o dado informado", async () => {
		prismaMock.user.findUnique.mockResolvedValue(user);

		await expect(Userservice.deleteUser(user.email)).resolves.toEqual(undefined);

	});

	//DELETA UM USUARIO APARTIR DO ID
	test("deve tentar deletar um usuário inexistente ==> deve gerar um erro", async () => {
		prismaMock.user.findUnique.mockResolvedValue(null);

		await expect(Userservice.deleteById(0)).rejects.toThrow(
			new InvalidParamError("Sua pesquisa não gerou resultados. O ID '" + user.id + "' não está na nossa base de dados.")
        );
	});

	test("deve deletar um usuário por id ==> deleta o usuário com o dado informado", async () => {
		prismaMock.user.findUnique.mockResolvedValue(user);

		await expect(Userservice.deleteById(user.id)).resolves.toEqual(undefined);

	});
});