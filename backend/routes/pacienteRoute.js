import express, { Router } from 'express';
import { autenticarToken } from "../middleware/auth.js";
import { buscarPaciente, criarPaciente, editarPaciente, listarPaciente } from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/', autenticarToken, criarPaciente);
router.put('/:id', autenticarToken, editarPaciente);
router.get('/', autenticarToken, listarPaciente);
router.get('/buscar-pacientes', autenticarToken, buscarPaciente);

export default router;