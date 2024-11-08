import { AppError } from "../errors";

export const urlNormalized = (name: string) => {
  const normalized = name
    .normalize("NFD") // Normaliza a string para decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .toLowerCase() // Converte para minúsculas
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^a-z0-9-]/g, ''); // Remove caracteres não permitidos
  return normalized;
};

export const validateData = (data_p: any, variaveis_p: any) => {
  const dataKeys = Object.keys(data_p);
  const isValid = dataKeys.every(key => variaveis_p.includes(key));

  if (!isValid) {
    throw new AppError('Dados inválidos: contém variáveis inesperadas.');
  }
};