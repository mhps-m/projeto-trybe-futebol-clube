import { LeaderboardOperations } from '../utils';
import { ITeam, ILeaderboard } from '../interfaces';

export default class LeaderboardService extends LeaderboardOperations {
  private teamLeaderboard(
    team: ITeam,
    homeOrAway: 'home' | 'away',
  ): ILeaderboard {
    const name = team.teamName;
    const { id } = team;
    const totalGames = this.countTotalGames(id, homeOrAway);
    const totalVictories = this.countTotalVictories(id, homeOrAway);
    const totalDraws = this.countTotalDraws(id, homeOrAway);
    const totalLosses = this.countTotalLosses(id, homeOrAway);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsFavor = this.countGoalsFavor(id, homeOrAway);
    const goalsOwn = this.countGoalsOwn(id, homeOrAway);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    const firstHalf = { name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses };
    const secondHalf = { goalsFavor, goalsOwn, goalsBalance, efficiency };

    return { ...firstHalf, ...secondHalf };
  }

  public getTeamsLeaderboard(
    teams: ITeam[],
    homeOrAway: 'home' | 'away',
  ): ILeaderboard[] {
    const teamsLeaderboard = teams.map((team) => this.teamLeaderboard(team, homeOrAway));

    teamsLeaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
    ));

    return teamsLeaderboard;
  }
}
