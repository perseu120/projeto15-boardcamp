import { Router } from "express";
import {getCustomers, getCustomersId, setCustomers, updateCustomers} from '../controllers/customersController.js'

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);

customersRouter.get('/customers/:id', getCustomersId);

customersRouter.post('/customers', setCustomers);

customersRouter.put('/customers/:id', updateCustomers);

export default customersRouter;