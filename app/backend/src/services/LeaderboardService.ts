import { LeaderboardOperations } from '../utils';
import { ITeam, ILeaderboard } from '../interfaces';

export default class LeaderboardService extends LeaderboardOperations {
  private teamLeaderboardFiltered(
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

  private teamLeaderboard(
    team: ITeam,
  ): ILeaderboard {
    const name = team.teamName;
    const { id } = team;
    const totalGames = this.countTotalGames(id, 'home') + this.countTotalGames(id, 'away');
    const totalVictories = this.countTotalVictories(id, 'home')
    + this.countTotalVictories(id, 'away');
    const totalDraws = this.countTotalDraws(id, 'home') + this.countTotalDraws(id, 'away');
    const totalLosses = this.countTotalLosses(id, 'home') + this.countTotalLosses(id, 'away');
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsFavor = this.countGoalsFavor(id, 'home') + this.countGoalsFavor(id, 'away');
    const goalsOwn = this.countGoalsOwn(id, 'home') + this.countGoalsOwn(id, 'away');
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    const firstHalf = { name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses };
    const secondHalf = { goalsFavor, goalsOwn, goalsBalance, efficiency };

    return { ...firstHalf, ...secondHalf };
  }

  public getTeamsLeaderboard(
    teams: ITeam[],
    homeOrAway?: 'home' | 'away',
  ): ILeaderboard[] {
    let teamsLeaderboard: ILeaderboard[];

    if (homeOrAway) {
      teamsLeaderboard = teams.map((team) => this.teamLeaderboardFiltered(team, homeOrAway));
    } else {
      teamsLeaderboard = teams.map((team) => this.teamLeaderboard(team));
    }

    teamsLeaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
    ));

    return teamsLeaderboard;
  }
}
