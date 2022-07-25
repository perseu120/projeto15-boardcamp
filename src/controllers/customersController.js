import connection from "../database/db.js";
import joi from "joi";

export async function getCustomers(req, res){
    
    const {rows: customers} = await connection.query(`SELECT * FROM customers`);

    res.status(200).send(customers);

}

export async function getCustomersId(req, res){

    const {id} = req.params

    const {rows:customer} = await connection.query(`SELECT * FROM customers c WHERE c.id = $1`, [id])

    if(customer.length <= 0){
        res.status(404).send("cliente não encontrado");
        return;
    }

    res.status(200).send(customer);//ainda falta adiciona a query string
}

export async function setCustomers(req, res){

    const {
        name,
        phone,
        cpf,
        birthday
    } = req.body;

    const schemaCustomers = joi.object({

        name: joi.string().required(),
        phone: joi.string().pattern(/[0-9]/).min(10).max(11).required(),
        cpf: joi.string().pattern(/[0-9]/).length(11).required(),
        birthday: joi.date().iso()
       
    })

    const validaCustomers = schemaCustomers.validate(req.body);
    
    if(validaCustomers.error){
        res.status(400).send("dados invalidos");
        return;
    }

    const {rows: customer} = await connection.query(`SELECT * FROM customers c WHERE c.cpf = $1`,[cpf]);

    if(customer.length > 0){
        res.status(409).send("cpf já cadastrado");
        return;
    }

    connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)`, [name, phone, cpf, birthday])

    res.sendStatus(201);

}

export async function updateCustomers(req, res){
    
    const {id} = req.params;

    const {
        name,
        phone,
        cpf,
        birthday
    } = req.body;

    const schemaCustomers = joi.object({

        name: joi.string().required(),
        phone: joi.string().pattern(/[0-9]/).min(10).max(11).required(),
        cpf: joi.string().pattern(/[0-9]/).length(11).required(),
        birthday: joi.date().iso()
       
    })

    const validaCustomers = schemaCustomers.validate(req.body);

    if(validaCustomers.error){
        res.status(400).send("dados invalidos");
        return;
    }

    const {rows:verificaCustomersExist} = await connection.query('SELECT * FROM customers c WHERE c.cpf = $1', [cpf]);
    
    if(verificaCustomersExist.length > 0){
        res.status(409).send("esse cpf já esta em uso");
        return;
    }

    await connection.query(`UPDATE customers SET name = $2, phone = $3, cpf = $4, birthday = $5  WHERE id = $1`, [id, name, phone, cpf, birthday]);

    res.sendStatus(200);
}