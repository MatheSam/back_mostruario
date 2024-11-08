import { AppDataSource } from "../../../data-source";
import { Products_imgs } from "../../../entities/products_imgs.entity";
import { AppError } from "../../../errors";
import { v4 as uuid } from "uuid";
import { validateData } from "../../../utils/functions";
import { Imgs } from "../../../entities/imgs.entity";

const prodImgsCreateService = async (data: any) => {
  const prodImgsRepo = AppDataSource.getRepository(Products_imgs);

  const prodImg = prodImgsRepo.create({
    id: uuid()
  })
  await prodImgsRepo.save(prodImg);

  const imgsRepo = AppDataSource.getRepository(Imgs);
  data.forEach(async (el: any) => {
    const { img, img_order, is_main } = el;
    const imgCreate = imgsRepo.create({
      id: uuid(),
      img,
      is_main,
      img_order,
      product_imgs: { id: prodImg?.id },
    });

    await imgsRepo.save(imgCreate);
  });
  
  return prodImg.id;
}

export default prodImgsCreateService;