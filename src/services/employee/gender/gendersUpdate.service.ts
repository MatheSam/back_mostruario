import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { Gender } from "../../../entities/gender.entity";
import { validateData } from "../../../utils/functions";

const gendersUpdateService = async (id: any, data: any): Promise<any> => {
  validateData(data, ['title', 'sigla']);
  
  const genderRepo = AppDataSource.getRepository(Gender);
  const {title, sigla} = data;

  const gender = await genderRepo.findOne({
    where: {id: id.id}
  });

  if (!gender) {
    throw new AppError("Gênero não encontrada!", 400);
  }

  if (title && title.toLowerCase() == gender.title.toLowerCase()) {
    throw new AppError("Genêro já cadastrada!", 400);
  } else if (sigla && sigla.toLowerCase() == gender.sigla.toLowerCase()) {
    throw new AppError("SIGLA já cadastrada!", 400);
  }

  gender.title = title || gender.title;
  gender.sigla = sigla || gender.sigla;

  await genderRepo.save(gender);
  return gender;
}

export default gendersUpdateService;