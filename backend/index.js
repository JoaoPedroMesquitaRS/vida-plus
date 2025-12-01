import express from 'express'; 
import cors from 'cors'; 
import sequelize from './config/database.js';
import dotenv from 'dotenv'; 

// ROTAS
import profissionalRoute from './routes/profissionalRoute.js';
import localAtendimentoRoute from './routes/localAtendimentoRoute.js';
import pacienteRoute from './routes/pacienteRoute.js';
import prontuarioRoute from './routes/prontuarioRoute.js'
import exameRoute from './routes/exameRoute.js';
import atendimentoRoute from './routes/atendimentoRoute.js';
import especialidadeRoute from './routes/especialidadeRoute.js';
import authRoute from './routes/authRoute.js';

// MODELOS
import Profissional from './models/Profissional.js';
import LocalAtendimento from './models/LocalAtendimento.js';
import Paciente from './models/Paciente.js';
import Prontuario from './models/Prontuario.js';
import Exame from './models/Exame.js';
import Atendimento from './models/Atendimento.js';
import Especialidade from './models/Especialidade.js';
import Usuario from './models/Usuario.js';

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 3001; 

app.use(cors()); 
app.use(express.json()); 

//
app.use('/profissionais', profissionalRoute);
app.use('/locais-atendimento', localAtendimentoRoute);
app.use('/pacientes', pacienteRoute);
app.use('/prontuarios', prontuarioRoute);
app.use('/exames', exameRoute);
app.use('/atendimentos', atendimentoRoute);
app.use('/especialidades', especialidadeRoute);
app.use('/auth', authRoute);

// Associações
const models = { Profissional, LocalAtendimento, Paciente, Prontuario, Exame, Atendimento, Especialidade, Usuario };
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado.');
});
 
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`); 
});