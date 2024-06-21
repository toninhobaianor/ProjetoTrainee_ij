import { prismaMock } from "../../../../config/singleton";
import { QueryError } from "../../../../errors/QueryError";
import AuthorService from "./AuthorService";

test("tenta deletar usuário inexistente ==> gera erro", async () => {
	prismaMock.author.findFirst.mockResolvedValue(null);

	await expect(AuthorService.deleteArtist(3)).rejects.toThrow(
		new QueryError("Esse email não está associado com nenhuma conta.")
	);

	expect(prismaMock.user.findFirst).toHaveBeenCalledWith({ where: { id: 3 } });
	expect(prismaMock.user.delete).not.toHaveBeenCalled();
});