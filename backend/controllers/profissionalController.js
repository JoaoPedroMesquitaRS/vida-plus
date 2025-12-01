import Especialidade from "../models/Especialidade.js";
import Profissional from "../models/Profissional.js";
import LocalAtendimento from "../models/LocalAtendimento.js";

export async function criarProfissional(req, res){
    try{
        const profissional = await Profissional.create(req.body);
        res.status(201).json(profissional)
    } catch(error){
        res.status(401).json({error: error.message});
    }
};

export async function editarProfissional(req, res) {
    try{
        const { id } = req.params;
        const { nome, idLocalAtendimento, especialidade, registro, telefone, email  } = req.body;  
        const [ profissionalAtualizado ] = await Profissional.update(
            {
                nome, idLocalAtendimento, especialidade, registro, telefone, email
            },
            {where: {id}}
        )
        if(profissionalAtualizado === 0){
            return res.status(400).json({error: `Profissional não localizado!`})
        }
        res.status(200).json({message: 'Profissional alterado com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    } 
}

export async function listarProfissional(req, res) {
    const profissionais = await Profissional.findAll({
        include: {
            model: Especialidade,
            as: 'especialidade'
        }
    });
    res.json(profissionais);
};

export async function listarProfissionalId(req, res) {
    const { id } = req.params;
    const profissional = await Profissional.findOne({
        where: {id},
        include: {
            model: LocalAtendimento,
            as: 'localAtendimento'
        }
    });
    res.json(profissional);
};

export async function deletarProfissional(req, res) {
    try{
        const { id } = req.params;

        const profissionalExcluido = await Profissional.destroy({where: {id}})
        
        if(profissionalExcluido === 0){
            return res.status(400).json({error: 'Profissional não localizado!'})
        }
        res.status(200).json({message: 'Profissional excluido com sucesso!'})
    } catch (error){
        res.status(500).json({error: error.message});
    }
}