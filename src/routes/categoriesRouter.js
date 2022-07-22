import { Router } from "express";

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories());

categoriesRouter.post('/categories', setCategories());


export default categoriesRouter;