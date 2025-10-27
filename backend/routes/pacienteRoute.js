import express, { Router } from 'express';
import { criarPaciente, listarPaciente } from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/', criarPaciente);
router.get('/', listarPaciente);

export default router;