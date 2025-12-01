import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function criarUsuario(req, res) {
    try{
        const { nome, email, senha, role } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuario = await Usuario.create({
            nome, email, senha: senhaCriptografada, role
        });

        res.status(201).json({message: 'Usuario criado com sucesso!', usuario});
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Erro ao criar usuario!'});
    }
}

export async function login(req, res) {
    try{
        const { email, senha } = req.body;

        const user = await Usuario.findOne({where: {email}});
        if(user){
            console.log("Usuario existe!")
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if(senhaValida){
            console.log("Senha valida!")
            const secret = process.env.SECRET;

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                }, 
                secret,
                { expiresIn: "1d" }
            );

            res.status(200).json({msg: 'Autenticação realizada com sucesso!', token})
        }else(
            res.status(500).json({msg: 'Autenticação falhou!'})
        )

    } catch(error){
        res.status(500).json({error: error.message})
    }
}

export async function detalhesUsuario(req, res) {
    try{
        const id = req.params.id;

        const usuario = await Usuario.findByPk(id);

        if(usuario){
            console.log("Usuario existe!");
        }
        res.status(200).json({usuario});
    } catch(error){
        res.status(400).json({error: error.message})
    }
}