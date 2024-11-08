import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { v4 as uuid } from "uuid";
import { SubCategories } from "../../../entities/subCategorie.entity";
import { urlNormalized, validateData } from "../../../utils/functions";
import { Categories } from "../../../entities/categories.entity";

const subCategoriesCreateService = async (dados: any) => {
  validateData(dados, ['title', 'categoryID']);

  const subRepo = AppDataSource.getRepository(SubCategories);
  const categoryRepo = AppDataSource.getRepository(Categories);

  const {title, categoryID} = dados;
  
  if(!title || !categoryID) {
    throw new AppError(`Campo obrigatório, não preenchido!`, 400);
  }

  const subs = await subRepo.find();
  if (subs.some(sub => sub.title.toLowerCase() == title.toLowerCase())) {
    throw new AppError("Já existe uma subcategoria com esse nome.", 400);
  }

  const category = await categoryRepo.findOne({
    where: {id: categoryID}
  })

  const subCategory = subRepo.create({
    id: uuid(),
    title,
    url: urlNormalized(title),
    category: {id: category?.id, title: category?.title}
  })

  await subRepo.save(subCategory);
  return subCategory;
}

export default subCategoriesCreateService;