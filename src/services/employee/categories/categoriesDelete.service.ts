import { AppDataSource } from "../../../data-source";
import { Categories } from "../../../entities/categories.entity";
import { AppError } from "../../../errors";

const categoryDeleteService = async (id: any) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  
  const category = await categoryRepo.findOne({
    where: {id: id.id},
    relations: ["subcategories"]
  });

  if (!category) {
    throw new AppError('Categoria não encontrada!', 404);
  }

  if (category.subcategories.length > 0) {
    throw new AppError('Não é possível deletar uma categoria onde há subcategorias');
  }

  await categoryRepo.delete(id);
};

export default categoryDeleteService;