import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { SubCategories } from "../../../entities/subCategorie.entity";
import { urlNormalized, validateData } from "../../../utils/functions";

const subCategorieUpdateService = async ({ id }: any, data: any): Promise<any> => {
  validateData(data, ['title', 'is_active', 'categoryID']);

  const subCategoriesRepo = AppDataSource.getRepository(SubCategories);
  const { title, is_active, categoryID } = data;

  const subCategory = await subCategoriesRepo.findOne({where: {id}, relations: ["products"]});

  if (!subCategory) {
    throw new AppError("SubCategoria não encontrado!", 400);
  }

  if (title && title.toLowerCase() == subCategory.title.toLowerCase()) {
    throw new AppError("Título já cadastrado!", 400);
  }

  subCategory.title = title ? title.toUpperCase() : subCategory.title;
  subCategory.url = title ? urlNormalized(title) : subCategory.url;

  if (is_active && (subCategory.products ?? []).length > 0) {
    throw new AppError('Não é possível inativar uma subcategoria onde há produtos');
  } else {
    subCategory.is_active = is_active || subCategory.is_active;
  }
  
  subCategory.category = categoryID || subCategory.category;
  await subCategoriesRepo.save(subCategory);
}

export default subCategorieUpdateService;