import { AppDataSource } from "../../data-source";
import { Categories } from "../../entities/categories.entity";

const categoriesIdListService = async ({id}: any) => {
  const categoriesRepo = AppDataSource.getRepository(Categories);
  return await categoriesRepo.findOneBy(id);
/*   const post = await categoriesRepo.find({
    where: {id},
    relations: {
      users: true, // Ativa a relação com a entidade Users
    },
    select: {
      id: true,
      title: true,
      descr: true,
      users: {
        id: true, // Seleciona apenas o ID do usuário
        name: true, // Seleciona apenas o nome do usuário
      },
      created_at: true,
      updated_at: true,
      is_active: true
    },
  }); */
}

export default categoriesIdListService;