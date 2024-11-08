import { AppDataSource } from "../../../data-source";
import { Products } from "../../../entities/products.entity";
import { AppError } from "../../../errors";
import { handleError } from "../../../middlewares/err.mid";
import { Request, Response } from "express";

const productsRepo = AppDataSource.getRepository(Products);

export const productsListController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { product_url } = req.params;
    const whereCondition = product_url ? { url: product_url.toLowerCase() } : {};

    const product = await productsRepo
      .createQueryBuilder("prod")
      .leftJoinAndSelect("prod.marca", "marca")
      .leftJoinAndSelect("prod.variations", "variation")
      .leftJoinAndSelect("variation.sizes", "size")
      .leftJoinAndSelect("variation.colors", "color")
      .leftJoinAndSelect("variation.product_imgs", "prod_imgs")
      .leftJoinAndSelect("prod_imgs.imgs", "imgs")
      .where(whereCondition)
      .orderBy("prod.title", "ASC")
      .select([
        "prod.title",
        "prod.id",
        "variation.estoque",
        "size.title",
        "size.id",
        "color.title",
        "color.id",
        "prod_imgs.id",
        "imgs.id",
        "imgs.is_main",
        "imgs.img_order",
        "imgs.img",
        "prod.url",
        "prod.short_descr",
        "prod.subcategory",
        "prod.is_active",
        "prod.price",
        "prod.promotion",
        "prod.a_vista",
        "prod.juros",
        "prod.parcelado",
        "prod.qtde_parcelado",
        "prod.caracteristicas",
        "prod.descr" 
      ])
      .getMany();

    return res.status(200).send(product);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
