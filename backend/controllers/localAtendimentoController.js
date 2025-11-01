import LocalAtendimento from "../models/LocalAtendimento.js";

export async function criarLocalAtendimento(req, res) {
    try{
        const localAtendimento = await LocalAtendimento.create(req.body);
        res.status(201).json(localAtendimento);
    } catch(error){
        res.status(401).json({error: error.message});
    }
};

export async function listarLocaisAtendimento(req, res) {
    const locaisAtendimento = await LocalAtendimento.findAll();
    res.json(locaisAtendimento);
};

export async function editarLocal(req, res) {
    try{
        const { id } = req.params;
        const { nome, endereco, tipo, observacao } = req.body;
        
        const [localAtualizado] = await LocalAtendimento.update(
            {
                nome, endereco, tipo, observacao
            },
            {where: {id}}
        );

        if(localAtualizado === 0){
            return res.status(400).json({error: `Local não localizado!`})
        }
        res.status(200).json({message: 'Local alterado com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

export async function listarProfissionaisLocal(req, res) {
    const { idLocal } = req.params;
    const profissionais = await LocalAtendimento.findByPk(idLocal, { include: 'profissionais' });
    res.json(profissionais);
};

export async function deletarLocal(req, res) {
    try{
        const { id } = req.params;
        
        const localExcluido = await LocalAtendimento.destroy({where: {id}});

        if(localExcluido === 0){
            return res.status(400).json({error: `Local não localizado!`})
        }
        res.status(200).json({message: 'Local excluido com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }
};