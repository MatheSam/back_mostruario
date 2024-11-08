import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import { AppError } from "../../../errors";
import { Marcas } from "../../../entities/marcas.entity";
import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { Products } from "../../../entities/products.entity";

const marcasDeleteController = async (req: Request, res: Response): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'product');

    const id = req.params;
    const faqRepo = AppDataSource.getRepository(Marcas);
    const productsRepo = AppDataSource.getRepository(Products);

    const products = await productsRepo.find({
      where: {marca: id}
    });

    return res.status(200).send(products);
    //await faqRepo.delete(id);
    //return res.status(200).json({"message": "Marca deletada!"})
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default marcasDeleteController;