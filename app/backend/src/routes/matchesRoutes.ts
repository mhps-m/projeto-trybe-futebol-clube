import { Router } from 'express';
import validateToken from '../middleware/validateToken';
import MatchesController from '../controllers/MatchesController';

const router: Router = Router();

router.get('/matches', MatchesController.findAll);
router.patch('/matches/:id/finish', validateToken, MatchesController.finish);

export default router;
