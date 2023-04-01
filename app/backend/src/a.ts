import LeaderboardService from './services/LeaderboardService';
import MatchesService from './services/MatchesService';
import LeaderboardOperations from './utils/LeaderboardOperations';

async function a() {
  // const b = await LeaderboardService.countTotalMatches('home', 11);
  // const d = await LeaderboardService.countTotalResults('home', 14, 'gt');
  // const c = await LeaderboardService.countTotalResults('home', 14, 'eq');
  // const e = LeaderboardService.countTotalPoints(d, c);

  const f = await MatchesService.findAll();
  const g = LeaderboardOperations.countTotalMatches(f, 11, 'home');
  console.log(g);
}

a();
