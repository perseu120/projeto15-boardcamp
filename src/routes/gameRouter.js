import { Router } from "express";
import {getGame, setGame} from '../controllers/gameControle.js'

const gameRouter = Router();

gameRouter.get('/game', getGame);
gameRouter.post('/game', setGame);

export default gameRouter;