import express,{json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import categoriesRouter from './src/routes/categoriesRouter.js'
import customersRouter from './src/routes/customersRouter.js'
import gameRouter from './src/routes/gameRouter.js'
import rentalsRouter from './src/routes/rentalsRouter.js'


dotenv.config();

const server=express();
server.use(cors());
server.use(json());

server.use(categoriesRouter);
server.use(customersRouter);
server.use(gameRouter);
server.use(rentalsRouter);

server.listen(process.env.PORT, ()=> console.log(`Servidor rodando na porta ${process.env.PORT}`));