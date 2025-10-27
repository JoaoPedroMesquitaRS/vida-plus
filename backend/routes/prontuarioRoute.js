import express, { Router } from 'express';
import { criarProntuario, listarProntuario } from '../controllers/prontuarioController.js';

const router = express.Router();

router.post('/', criarProntuario);
router.get('/', listarProntuario);

export default router;