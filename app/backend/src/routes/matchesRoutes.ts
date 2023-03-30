import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const router: Router = Router();

router.get('/matches', MatchesController.findAll);

export default router;
