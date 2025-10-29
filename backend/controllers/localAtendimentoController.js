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

export async function listarProfissionaisLocal(req, res) {
    const { idLocal } = req.params;
    const profissionais = await LocalAtendimento.findByPk(idLocal, { include: 'profissionais' });
    res.json(profissionais);
}