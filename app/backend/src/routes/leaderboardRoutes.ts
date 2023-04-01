import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const router: Router = Router();

router.get('/leaderboard/home', LeaderboardController.get);
router.get('/leaderboard/away', LeaderboardController.get);

export default router;
