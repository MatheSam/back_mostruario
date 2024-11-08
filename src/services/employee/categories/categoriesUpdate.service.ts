import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { Categories } from "../../../entities/categories.entity";
import { urlNormalized, validateData } from "../../../utils/functions";

const categorieUpdateService = async ({ id }: any, data: any): Promise<any> => {
  validateData(data, ['title', 'is_active']);

  const categoriesRepo = AppDataSource.getRepository(Categories);
  const { title, is_active } = data;
  const category = await categoriesRepo.findOne({where: {id}, relations: ["subcategories"]});

  if (!category) {
    throw new AppError("Categoria não encontrado!", 400);
  }

  if (title && title.toLowerCase() == category.title.toLowerCase()) {
    throw new AppError("Título já cadastrado!", 400);
  }

  category.title = title ? title.toUpperCase() : category.title;
  category.url = title ? urlNormalized(title) : category.url;

  if (is_active && category.subcategories.length > 0) {
    throw new AppError('Não é possível inativar uma categoria onde há subcategorias');
  } else {
    category.is_active = is_active || category.is_active;
  }

  await categoriesRepo.save(category);

  return category;
}

export default categorieUpdateService;