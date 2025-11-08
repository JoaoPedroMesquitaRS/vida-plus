import express, { Router } from 'express';
import { criarEspecialidade, listarEspecialidades } from '../controllers/especialidadeController.js';

const router = express.Router();

router.post('/', criarEspecialidade);
router.get('/', listarEspecialidades);

export default router;