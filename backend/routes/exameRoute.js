import express, { Router } from 'express';
import { criarExame, listarExame } from '../controllers/exameController.js';

const router = express.Router();

router.post('/', criarExame);
router.get('/', listarExame);

export default router;