import { Router } from "express";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals());

rentalsRouter.post('/rentals', setRentals());

rentalsRouter.post('/rentals/:id/return', setRentalsDevolution());

rentalsRouter.delete('/rentals/:id', deleteRentals());

export default rentalsRouter;