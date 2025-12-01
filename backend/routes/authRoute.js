import express from 'express';
import { criarUsuario, detalhesUsuario, login } from '../controllers/authController.js';
import { autenticarToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', criarUsuario);
router.post('/login', login);
router.get('/:id', autenticarToken, detalhesUsuario);

export default router;