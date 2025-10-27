import Atendimento from '../models/Atendimento.js';

export async function criarAtendimento(req, res) {
    try{
        const atendimento = await Atendimento.create(req.body);
        res.status(201).json(atendimento);
    } catch(error){
        res.status(401).json({error: error.message})
    }
};

export async function listarAtendimento(req, res) {
    const atendimentos = await Atendimento.findAll();
    res.json(atendimentos);    
};