import express, { Router } from 'express';
import { buscarPaciente, criarPaciente, editarPaciente, listarPaciente } from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/', criarPaciente);
router.put('/:id', editarPaciente);
router.get('/', listarPaciente);
router.get('/buscar-pacientes', buscarPaciente);

export default router;