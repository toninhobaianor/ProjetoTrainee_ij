
import { prismaMock } from "../../../../config/singleton";

import AuthorService from "./AuthorService";

test("tenta deletar usuário inexistente ==> gera erro", async () => {
	prismaMock.author.findUnique.mockResolvedValue(null);
	await expect(AuthorService.deleteArtist(0)).rejects.toThrow(
		new Error("Não foi possível deletar o artista.")
	);

	expect(prismaMock.author.findUnique).toHaveBeenCalledWith({ where: { id: 0 } });
	expect(prismaMock.author.delete).not.toHaveBeenCalled();
});


test("tenta deletar usuário inexistente ==> deleta usuario", async () => {
	prismaMock.author.findUnique.mockResolvedValue(null);
	await expect(AuthorService.deleteArtist(0)).rejects.toThrow(
		new Error("Não foi possível deletar o artista.")
	);

	expect(prismaMock.author.findUnique).toHaveBeenCalledWith({ where: { id: 0 } });
	expect(prismaMock.author.delete).not.toHaveBeenCalled();
});