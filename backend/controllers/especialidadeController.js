import Especialidade from "../models/Especialidade.js";

export async function criarEspecialidade(req, res) {
    try{
        const especialidade = await Especialidade.create(req.body);
        res.status(201).json(especialidade);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};