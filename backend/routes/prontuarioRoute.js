import express, { Router } from 'express';
import { criarProntuario, listarAtendimentosProntuario, listarProntuario, validarProntuario } from '../controllers/prontuarioController.js';

const router = express.Router();

router.post('/', criarProntuario);
router.get('/', listarProntuario);
router.get('/validar/:id', validarProntuario);
router.get('/atendimentos/:idPaciente', listarAtendimentosProntuario);

export default router;