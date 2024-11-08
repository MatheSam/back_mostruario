import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { Products } from "../../../entities/products.entity";
import { v4 as uuid } from "uuid";
import { SubCategories } from "../../../entities/subCategorie.entity";
import { urlNormalized, validateData } from "../../../utils/functions";
import prodImgsCreateService from "../prod_imgs/prodImgsCreate.services";
import { Products_variations } from "../../../entities/products_variations.entity";
import { Imgs } from "../../../entities/imgs.entity";
import { Products_imgs } from "../../../entities/products_imgs.entity";
import { Colors } from "../../../entities/color.entity";

const productsCreateService = async (dados: any) => {
  const productsRepo = AppDataSource.getRepository(Products)
  const subCategoriesRepo = AppDataSource.getRepository(SubCategories)

  const {
    title,
    subcategory,
    a_vista,
    caracteristicas,
    descr,
    juros,
    marca,
    parcelado,
    price,
    promotion,
    qtde_parcelado,
    short_descr,
    sizes,
    colors,
    images,
    gender
  } = dados;

  /*   validateData(dados, ["title",
      "short_descr",
      "subcategory",
      "is_active",
      "price",
      "promotion",
      "a_vista",
      "juros",
      "parcelado",
      "qtde_parcelado",
      "caracteristicas",
      "descr",
      "marca",
      "sizes",
      "colors",
      "images",
      "gender"]); */

  // const products = await productsRepo.find();
  // if (products.some(prod => prod.title.toLowerCase() == title.toLowerCase())) {
  //   throw new AppError('Já existe outro produto com o mesmo nome!');
  // }

  const subCategory = await subCategoriesRepo.findOne({
    where: { id: subcategory }
  });

  const product = productsRepo.create({
    id: uuid(),
    a_vista,
    caracteristicas,
    descr,
    juros,
    marca,
    parcelado,
    price,
    promotion,
    qtde_parcelado,
    short_descr,
    subcategory: { id: subCategory?.id, title: subCategory?.title },
    title,
    url: urlNormalized(title),
    gender
  })

  const colorsRepo = AppDataSource.getRepository(Colors);

  //  const prodVariationsRepo = AppDataSource.getRepository(Products_variations);  const imgsRepo = AppDataSource.getRepository(Imgs);  const imgsRepos = AppDataSource.getRepository(Products_imgs);  await imgsRepo.clear();  await prodVariationsRepo.clear();  await imgsRepos.clear();  await productsRepo.clear(); /*

  await productsRepo.save(product);

  const prod_id = product.id;
  const prodVariationsRepo = AppDataSource.getRepository(Products_variations);

  dados.variacoes.forEach(async (el: any) => {
    const { imgs, color, sizes } = el;
    const img = await prodImgsCreateService(imgs)

    sizes.forEach(async (size: any) => {
      const variacao = prodVariationsRepo.create({
        id: uuid(),
        colors: {id: color},
        estoque: size.qtde,
        product: { id: prod_id },
        product_imgs: { id: img },
        sizes: size.size
      })
      
      await prodVariationsRepo.save(variacao);
    })
  })

  return product;
  /** */
};

export default productsCreateService;