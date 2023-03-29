import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router: Router = Router();

router.get('/teams', TeamsController.findAll);
router.get('/teams/:id', TeamsController.findById);

export default router;
