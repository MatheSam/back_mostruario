import 'reflect-metadata';
import express from 'express';
// import rolesRoutes from './routes/roles';
import { AppDataSource } from './data-source';
// import permissionsRoutes from './routes/permissions';
import userRoutes from './routes/users';
import faqRoutes from './routes/faq';
import postRoutes from './routes/posts';
import loginRoutes from './routes/login';
import categoriesRoutes from './routes/categories';

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);
// app.use('/cargos', rolesRoutes);
// app.use('/permissoes', permissionsRoutes);
app.use('/usuarios', userRoutes);
app.use('/faq', faqRoutes);
app.use('/publicacoes', postRoutes);
app.use('/categorias', categoriesRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })


app.listen(3000);