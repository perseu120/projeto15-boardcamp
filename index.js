import express,{json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config();

const server=express();
server.use(cors());
server.use(json());

server.use(authRouter);

server.listen(process.env.PORT);