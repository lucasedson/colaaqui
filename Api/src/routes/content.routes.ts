import { Router } from 'express';
import ContentController from '../controllers/content.controller';

const router = Router();

router.post('/', ContentController.create);
router.get('/', ContentController.findAll);
export default router;