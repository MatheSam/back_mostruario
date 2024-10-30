import 'reflect-metadata';
import express from 'express';
import rolesRoutes from './routes/roles';

const app = express();

app.use(express.json());

app.use('/cargos', rolesRoutes)

app.listen(3000);