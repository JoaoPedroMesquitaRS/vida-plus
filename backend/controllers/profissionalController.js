import Profissional from "../models/Profissional.js";

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
    const profissionais = await Profissional.findAll();
    res.json(profissionais);
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