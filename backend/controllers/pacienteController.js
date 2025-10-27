import Paciente from "../models/Paciente.js";

export async function criarPaciente(req, res) {
    try{
        const paciente = await Paciente.create(req.body);
        res.status(201).json(paciente);
    } catch(error){
        res.status(401).json({error: error.message});
    }
}

export async function listarPaciente(req, res) {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
}