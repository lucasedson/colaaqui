import { Router } from 'express';
import contentRoutes from './content.routes'; // 1. Importe as rotas de conteúdo

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

// 2. Use as rotas de conteúdo com o prefixo '/contents'
router.use('/contents', contentRoutes);

export default router;