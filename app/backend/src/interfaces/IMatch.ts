import ITeam from './ITeam';

export interface IGoals {
  homeTeamGoals?: number;
  awayTeamGoals?: number;
}

export default interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: ITeam;
  awayTeam: ITeam;
}
