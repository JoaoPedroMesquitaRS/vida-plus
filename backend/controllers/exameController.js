import { Op } from "sequelize";
import Exame from "../models/Exame.js";
import Paciente from "../models/Paciente.js";

export async function criarExame(req, res) {
    try{
        const exame = await Exame.create(req.body);
        res.status(201).json(exame);
    } catch(error){
        res.status(401).json({error: error.message});
    }
};

export async function listarExame(req, res) {
    try{
        const { opcao } = req.query;
        
        // opção: 'pendente' e 'finalizado'

        const exames = await Exame.findAll({
            where: {
                status: { [Op.like]: opcao }
            },
            include: {
                model: Paciente,
                as: 'paciente'
            }
        })
        res.json(exames);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

export async function alterarExame(req, res) {
    try{
        const { id } = req.params;
        const { dataResultado, resultado, status } = req.body;

        const [exameAtualizado] = await Exame.update(
            {
                dataResultado, resultado, status
            },
            { where: { id } },
        );

        if(exameAtualizado === 0){
            return res.status(400).json({error: `Exame não localizado!`})
        }
        res.status(200).json({message: 'Exame alterado com sucesso!'});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}