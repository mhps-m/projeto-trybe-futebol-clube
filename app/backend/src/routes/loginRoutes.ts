import { Router } from 'express';
import validateToken from '../middleware/validateToken';
import LoginController from '../controllers/LoginController';

const router: Router = Router();

router.post('/login', LoginController.login);
router.get('/login/role', validateToken, LoginController.getRole);

export default router;
