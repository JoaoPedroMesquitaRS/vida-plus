import { Op } from "sequelize";
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

export async function editarPaciente(req, res) {
    try{
        const { id } = req.params;
        const { nome, cpf, dataNascimento, telefone } = req.body;

        const [pacienteAtualizado] = await Paciente.update(
            {
                nome, cpf, dataNascimento, telefone
            },
            {where: {id}}
        )
        if(pacienteAtualizado === 0){
            return res.status(400).json({error: `Local não localizado!`})
        }
        res.status(200).json({message: 'Local alterado com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

export async function buscarPaciente(req, res) {
    try{
        const { filtro, valor } = req.query;
        let where = {};

        if (filtro === "Nome") {
            where.nome = { [Op.like]: `%${valor}%` };
        } else if (filtro === "CPF") {
            where.cpf = { [Op.like]: `%${valor}%` };
        } else if (filtro === "Data de Nascimento") {
            where.dataNascimento = { [Op.like]: `%${valor}%` };
        }

        const pacientes = await Paciente.findAll({ where });

        res.json(pacientes);
        
    } catch(error){
        res.status(500).json({error: error.message});
    }
}