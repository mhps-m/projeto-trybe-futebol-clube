import ITeam from './ITeam';

export interface IGoals {
  homeTeamGoals?: number;
  awayTeamGoals?: number;
}

export interface INewMatch {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
}

export default interface IMatch extends INewMatch {
  id: number;
  inProgress: boolean;
  homeTeam: ITeam;
  awayTeam: ITeam;
}
