import express, { Router } from 'express';
import { criarLocalAtendimento, listarLocaisAtendimento, listarProfissionaisLocal } from '../controllers/localAtendimentoController.js';

const router = express.Router();

router.post('/', criarLocalAtendimento);
router.get('/', listarLocaisAtendimento);
router.get('/profissional/:idLocal', listarProfissionaisLocal);

export default router;