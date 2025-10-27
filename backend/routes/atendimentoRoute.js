import express, { Router } from 'express';
import { criarAtendimento, listarAtendimento } from '../controllers/atendimentoController.js';

const router = express.Router();

router.post('/', criarAtendimento);
router.post('/', listarAtendimento);

export default router;