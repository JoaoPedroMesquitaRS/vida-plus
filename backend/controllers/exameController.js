import Exame from "../models/Exame.js";

export async function criarExame(req, res) {
    try{
        const exame = await Exame.create(req.body);
        res.status(201).json(exame);
    } catch(error){
        res.status(401).json({error: error.message});
    }
};

export async function listarExame(req, res) {
    const exames = await Exame.findAll();
    res.json(exames);
};