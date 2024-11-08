import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { Products_imgs } from "../../../entities/products_imgs.entity";
import { validateData } from "../../../utils/functions";

const prodImgssUpdateService = async (id: any, data: any): Promise<any> => {
/*   const prodImgsRepo = AppDataSource.getRepository(Products_imgs);
  const {img, is_main, img_order, colorID} = data;
  validateData(data, ['img', 'is_main', 'img_order']);

  const prodImgs = await prodImgsRepo.findOne({
    where: {id: id.id}
  });

  if (!prodImgs) {
    throw new AppError("Imagem não encontrada!", 400);
  }

  prodImgs.img = img || prodImgs.img;
  prodImgs.is_main = is_main || prodImgs.is_main;
  prodImgs.img_order = img_order || prodImgs.img_order;

  await prodImgsRepo.save(prodImgs);
  return prodImgs; */
}

export default prodImgssUpdateService;