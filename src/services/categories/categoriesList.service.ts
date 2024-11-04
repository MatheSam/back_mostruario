import { AppDataSource } from "../../data-source";
import { Categories } from "../../entities/categories.entity";

const categoriesListService = async () => {
  const categoriesRepo = AppDataSource.getRepository(Categories);
  return await categoriesRepo.find();
};

export default categoriesListService;
