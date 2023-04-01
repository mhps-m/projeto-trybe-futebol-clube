import IMatch from '../interfaces/IMatch';

export default class LeaderboardOperations {
  private matches: IMatch[];

  constructor(matches: IMatch[]) {
    this.matches = matches;
  }

  public countTotalGames(
    id: number | string,
    homeOrAway: 'home' | 'away',
  ): number {
    const totalGames = this.matches.reduce((acc, match) => (
      match[`${homeOrAway}TeamId`] === id
      && match.inProgress === false
        ? acc + 1
        : acc
    ), 0);

    return totalGames;
  }

  private static enemyTeamIs(homeOrAway: 'home' | 'away') {
    return homeOrAway === 'home' ? 'away' : 'home';
  }

  public countTotalVictories(
    id: number | string,
    homeOrAway: 'home' | 'away',
  ): number {
    const enemyTeamIs = LeaderboardOperations.enemyTeamIs(homeOrAway);

    const totalVictories = this.matches.reduce((acc, match) => (
      match[`${homeOrAway}TeamId`] === id
      && match.inProgress === false
      && match[`${homeOrAway}TeamGoals`] > match[`${enemyTeamIs}TeamGoals`]
        ? acc + 1
        : acc
    ), 0);

    return totalVictories;
  }

  public countTotalLosses(
    id: number | string,
    homeOrAway: 'home' | 'away',
  ): number {
    const enemyTeamIs = LeaderboardOperations.enemyTeamIs(homeOrAway);

    const totalLosses = this.matches.reduce((acc, match) => (
      match[`${homeOrAway}TeamId`] === id
      && match.inProgress === false
      && match[`${homeOrAway}TeamGoals`] < match[`${enemyTeamIs}TeamGoals`]
        ? acc + 1
        : acc
    ), 0);

    return totalLosses;
  }

  public countTotalDraws(
    id: number | string,
    homeOrAway: 'home' | 'away',
  ): number {
    const enemyTeamIs = LeaderboardOperations.enemyTeamIs(homeOrAway);

    const totalDraws = this.matches.reduce((acc, match) => (
      match[`${homeOrAway}TeamId`] === id
      && match.inProgress === false
      && match[`${homeOrAway}TeamGoals`] === match[`${enemyTeamIs}TeamGoals`]
        ? acc + 1
        : acc
    ), 0);

    return totalDraws;
  }

  public countGoalsOwn(
    id: number | string,
    homeOrAway: 'home' | 'away',
  ): number {
    const enemyTeamIs = LeaderboardOperations.enemyTeamIs(homeOrAway);

    const goalsOwn = this.matches.reduce((acc, match) => (
      match[`${homeOrAway}TeamId`] === id
      && match.inProgress === false
        ? acc + match[`${enemyTeamIs}TeamGoals`]
        : acc
    ), 0);

    return goalsOwn;
  }

  public countGoalsFavor(
    id: number | string,
    homeOrAway: 'home' | 'away',
  ): number {
    const goalsFavor = this.matches.reduce((acc, match) => (
      match[`${homeOrAway}TeamId`] === id
      && match.inProgress === false
        ? acc + match[`${homeOrAway}TeamGoals`]
        : acc
    ), 0);

    return goalsFavor;
  }
}
