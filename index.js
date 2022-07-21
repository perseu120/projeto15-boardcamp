import express,{json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'

dotenv.config();

const server=express();
server.use(cors());
server.use(json());

server.use(authRouter);
server.use(productRouter);
server.use(userRouter)

server.listen(process.env.PORT);