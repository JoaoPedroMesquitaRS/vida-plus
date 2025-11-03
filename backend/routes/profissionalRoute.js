import express, { Router } from 'express';
import { criarProfissional, deletarProfissional, editarProfissional, listarProfissional } from '../controllers/profissionalController.js';

const router = express.Router();

router.post('/', criarProfissional);
router.get('/', listarProfissional);
router.put('/:id', editarProfissional);
router.delete('/:id', deletarProfissional);

export default router;