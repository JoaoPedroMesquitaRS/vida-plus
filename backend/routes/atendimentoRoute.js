import express, { Router } from 'express';
import { alterarAtendimento, criarAtendimento, listarAtendimento } from '../controllers/atendimentoController.js';

const router = express.Router();

router.post('/', criarAtendimento);
router.post('/', listarAtendimento);
router.put('/:id', alterarAtendimento);

export default router;