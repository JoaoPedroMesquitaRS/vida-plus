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

export async function alterarAtendimento(req, res) {
    try{
        const { id } = req.params;
        const { subjetivo, objetivo, avaliacao, plano, status } = req.body;
        const [atendimentoAtualizado] = await Atendimento.update(
            {
                subjetivo, objetivo, avaliacao, plano, status
            },
            { where: {id} }
        );

        if(atendimentoAtualizado === 0){
            return res.status(400).json({error: `Atendimento não localizado!`})
        }
        res.status(200).json({message: 'Atendimento alterado com sucesso!'});

    } catch(error){
        res.status(500).json({error: error.message});
    }

}