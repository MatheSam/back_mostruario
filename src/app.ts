import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import { postRoutesClient, faqRoutesClient, categoryRoutesClient } from './routes/client';

import userRoutes from './routes/employee/users';
import loginRoutes from './routes/login';
import faqRoutes from './routes/employee/faq';
import postRoutes from './routes/employee/posts';
import categoriesRoutes from './routes/employee/categories';
import subCategoriesRoutes from './routes/employee/subcategories';
import productsRoutes from './routes/employee/product';
import marcasRoutes from './routes/employee/marcas';
import colorsRoutes from './routes/employee/colors';
import sizesRoutes from './routes/employee/sizes';
import gendersRoutes from './routes/employee/genders';

const app = express();

app.use(express.json());
app.use('/login', loginRoutes);

// ROTAS CLIENTE
app.use('/faq', faqRoutesClient);
app.use('/publicacoes', postRoutesClient);
app.use('/categorias', categoryRoutesClient);

// ROTAS USUÁRIO
app.use('/dashboard/usuarios', userRoutes)
app.use('/dashboard/faq', faqRoutes);
app.use('/dashboard/publicacoes', postRoutes)
app.use('/dashboard/categorias', categoriesRoutes);
app.use('/dashboard/subcategorias', subCategoriesRoutes);
app.use('/dashboard/produtos', productsRoutes);
app.use('/dashboard/marcas', marcasRoutes);
app.use('/dashboard/cores', colorsRoutes);
app.use('/dashboard/tamanhos', sizesRoutes);
app.use('/dashboard/generos', gendersRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })


app.listen(3000);