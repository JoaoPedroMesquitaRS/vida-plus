import express, { Router } from 'express';
import { criarPaciente, editarPaciente, listarPaciente } from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/', criarPaciente);
router.put('/:id', editarPaciente);
router.get('/', listarPaciente);

export default router;