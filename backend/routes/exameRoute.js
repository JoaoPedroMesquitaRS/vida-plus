import express, { Router } from 'express';
import { alterarExame, criarExame, listarExame } from '../controllers/exameController.js';

const router = express.Router();

router.post('/', criarExame);
router.get('/', listarExame);
router.put('/:id', alterarExame);

export default router;