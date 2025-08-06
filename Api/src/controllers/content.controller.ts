import { Request, Response } from 'express';
import ContentService from '../services/content.service'; // Importe o serviço

class ContentController {
  // POST /contents - Método que já tínhamos
  static async create(req: Request, res: Response) {
    // ... (lógica existente)
    return res.status(200).json({ message: 'Controller de Conteúdo funcionando!' });
  }

  // GET /contents - Novo método
  static async findAll(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;


    try {
      // Chama o serviço para buscar os dados
      const contents = await ContentService.findAll(page);
      
      // Retorna a lista com status 200 OK
      return res.status(200).json(contents);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Futuramente: findById, update, delete...
}

export default ContentController;