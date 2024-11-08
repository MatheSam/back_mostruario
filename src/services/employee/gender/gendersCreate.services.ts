import { AppDataSource } from "../../../data-source";
import { Gender } from "../../../entities/gender.entity";
import { AppError } from "../../../errors";
import { v4 as uuid } from "uuid";
import { validateData } from "../../../utils/functions";

const genderCreateService = async (dados: any) => {
  validateData(dados, ['title', 'sigla']);

  const genderRepo = AppDataSource.getRepository(Gender);
  const {title, sigla} = dados;

  if(!title || !sigla) {
    throw new AppError(`Um dos campos obrigatórios não foi preenchido!`, 400);
  }

  const genders = await genderRepo.find();
  if (genders.some(gender => gender.title.toLowerCase() == title.toLowerCase())) {
    throw new AppError("Já existe um gênero com esse nome.", 400);
  }

  if (genders.some(gender => gender.sigla.toLowerCase() == sigla.toLowerCase())) {
    throw new AppError("Já existe um gênero com essa sigla.", 400);
  }

  const gender = genderRepo.create({
    id: uuid(),
    title,
    sigla
  })

  await genderRepo.save(gender);

  return gender;
}

export default genderCreateService;