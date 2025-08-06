import express from 'express';
import allRoutes from './routes/index'; // Importa nosso agregador de rotas

const app = express();
app.use(express.json());

// Define um prefixo para todas as rotas da API e usa nosso roteador
app.use('/api/v1', allRoutes);

export default app;