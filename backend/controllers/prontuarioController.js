import Paciente from "../models/Paciente.js";
import Prontuario from "../models/Prontuario.js";
import Atendimento from "../models/Atendimento.js";
import Profissional from "../models/Profissional.js";
import LocalAtendimento from "../models/LocalAtendimento.js";

export async function criarProntuario(req, res) {
    try{
        const prontuario = await Prontuario.create(req.body);
        res.status(201).json(prontuario);
    } catch(error){
        res.status(401).json({error: error.message});
    }
};

export async function listarProntuario(req, res) {
    const prontuarios = await Prontuario.findAll();
    res.json(prontuarios);
};

export async function validarProntuario(req, res) {
    try{
        const { id } = req.params;
        const prontuario = await Prontuario.findOne({
            where: { idPaciente: id },
            include: {
                model: Paciente,
                as: 'paciente'
            }
        });

        if(prontuario){
            res.json({
                existe: true,
                idProntuario: prontuario.id
            });
        } else {
            const prontuarioCriado = await Prontuario.create({idPaciente: id});
            res.json({
                existe: false,
                idProntuario: prontuarioCriado.id
            });
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

export async function listarAtendimentosProntuario(req, res) {
    try{
        const { idPaciente } = req.params;

        const prontuario = await Prontuario.findOne({
            where: { idPaciente },
            include: [
                {
                    model: Atendimento,
                    as: 'atendimentos',
                    include: [
                        { model: Profissional, as: 'profissional' },
                        { model: LocalAtendimento, as: 'localAtendimento' }
                    ]
                }
            ]
        });

        if(!prontuario){
            return res.status(404).json({error: 'Prontuario não encontrado'});
        }

        res.json(prontuario.atendimentos);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};