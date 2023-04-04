import { Router } from 'express';
import { validateToken } from '../middleware';
import { LoginController } from '../controllers';

const router: Router = Router();

router.post('/login', LoginController.login);
router.get('/login/role', validateToken, LoginController.getRole);

export default router;
