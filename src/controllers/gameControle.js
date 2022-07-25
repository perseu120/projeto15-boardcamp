import connection from "../database/db.js";
import joi from "joi";

const schemaJogo = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    categoryId: joi.number().positive().required(),
    stockTotal: joi.number().min(1).required(),
    pricePerDay: joi.number().min(1).required()
})

export async function getGame(req, res){

    const {rows: games} = await connection.query(`SELECT g.*, c.name as categoryName FROM games g 
        JOIN categories c 
        ON g."categoryId" = c.id`);

    res.status(200).send(games);//ainda falta adicionar a query string na rota

}

export async function setGame(req, res){

    const {
        name,
        image,
        categoryId,
        stockTotal,
        pricePerDay
    } = req.body;
   
    const validacategoria = schemaJogo.validate(req.body);

    const {rows:validarIdCategoria} = await connection.query(`SELECT * FROM categories c WHERE c.id = $1`,[req.body.categoryId]);
   
    if(validacategoria.error || validarIdCategoria.length <= 0){
        res.status(400).send("dados invalidos");
        return;
    }

    const {rows:validaNome} = await connection.query(`SELECT * FROM games g WHERE g.name = $1`, [req.body.name]);
    
    if(validaNome.length > 0){
        res.status(409).send("nome de jogo já existe");
        return;
    }

    await connection.query(`INSERT INTO games (name, image, "categoryId", "stockTotal", "pricePerDay") VALUES ($1,$2,$3,$4,$5)`, [name, image, categoryId, stockTotal, pricePerDay])
    // await connection.query(`DELETE FROM games g WHERE g.id = 5`);

    res.sendStatus(201);
}