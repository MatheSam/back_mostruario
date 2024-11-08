import { AppDataSource } from "../../../data-source";
import { SubCategories } from "../../../entities/subCategorie.entity";
import { AppError } from "../../../errors";

const subCategoryDeleteService = async ({id}: any) => {
  const subCategoryRepo = AppDataSource.getRepository(SubCategories);

  const subCategory = await subCategoryRepo.findOne({
    where: {id: id},
    relations: ["products", "category"]
  });

  if ((subCategory!.products ?? []).length > 0) {
    throw new AppError('Não é possível excluir uma subcategoria onde há produtos');
  }

  await subCategoryRepo.delete(id);
};

export default subCategoryDeleteService;