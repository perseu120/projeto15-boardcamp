import { Router } from "express";
import {getCategories, setCategories} from '../controllers/categoriesController.js'

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);

categoriesRouter.post('/categories', setCategories);


export default categoriesRouter;