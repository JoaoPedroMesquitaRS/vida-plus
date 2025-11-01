import express, { Router } from 'express';
import { criarLocalAtendimento, deletarLocal, editarLocal, listarLocaisAtendimento, listarProfissionaisLocal } from '../controllers/localAtendimentoController.js';

const router = express.Router();

router.post('/', criarLocalAtendimento);
router.get('/', listarLocaisAtendimento);
router.put('/:id', editarLocal);
router.delete('/:id', deletarLocal);
router.get('/profissional/:idLocal', listarProfissionaisLocal);

export default router;