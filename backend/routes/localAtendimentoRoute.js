import express, { Router } from 'express';
import { criarLocalAtendimento, listarLocaisAtendimento } from '../controllers/localAtendimentoController.js';

const router = express.Router();

router.post('/', criarLocalAtendimento);
router.get('/', listarLocaisAtendimento);

export default router;