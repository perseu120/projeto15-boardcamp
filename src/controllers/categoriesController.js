import connection from "../database/db.js";
import joi from 'joi';

const schemaName = joi.object({
    name: joi.string().required()
})

export async function getCategories(req, res){

    const {rows: categories} = await connection.query('SELECT * FROM categories');

    res.send(categories);
  
}

export async function setCategories(req, res){

    const userValidate = schemaName.validate(req.body);

    if(userValidate.error){
        res.status(400).send("nome de categoria invalido");
        return;
    }

    const {rows: categoriesName} = await connection.query(`SELECT * FROM categories c WHERE c.name = $1`,[req.body.name] );
    
    console.log(categoriesName)
    if(categoriesName.length > 0){
        res.status(409).send("essa categoria já existe");
        return;
    }

    connection.query(`INSERT INTO categories (name) VALUES ($1)`, [req.body.name])

    res.sendStatus(201);

    // connection.query(`DELETE FROM categories c WHERE name='Estratégia'`);

}