import { Router } from "express";

const gameRouter = Router();

gameRouter.get('/game', getGame());
gameRouter.post('/game', setGame());

export default gameRouter;