import { Router } from 'express';
import validateToken from '../middleware/validateToken';
import MatchesController from '../controllers/MatchesController';

const router: Router = Router();

router.get('/matches', MatchesController.findAll);
router.patch('/matches/:id/finish', validateToken, MatchesController.finish);
router.patch('/matches/:id', validateToken, MatchesController.update);
router.post('/matches', validateToken, MatchesController.create);

export default router;
