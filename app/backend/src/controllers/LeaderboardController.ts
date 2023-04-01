import { Request, Response } from 'express';
import { LeaderboardService, MatchesService, TeamsService } from '../services';
import { IMatch, ITeam, ILeaderboard } from '../interfaces';

export default class LeaderboardController {
  public static async get(req: Request, res: Response): Promise<Response> {
    const homeOrAway: 'home' | 'away' = req.url.includes('home') ? 'home' : 'away';
    const matches: IMatch[] = await MatchesService.findAll();
    const teams: ITeam[] = await TeamsService.findAll();

    const leaderboardService = new LeaderboardService(matches);
    const leaderboard: ILeaderboard[] = leaderboardService.getTeamsLeaderboard(teams, homeOrAway);

    return res.status(200).json(leaderboard);
  }
}
