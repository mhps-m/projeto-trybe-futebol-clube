export const matchesMock = [{
  id: 1,
  homeTeamId: 8,
  homeTeamGoals: 1,
  awayTeamId: 14,
  awayTeamGoals: 2,
  inProgress: true,
  homeTeam: {
    teamName: 'Flamengo',
  },
  awayTeam: {
    teamName: 'Cruzeiro',
  },
},
{
  id: 2,
  homeTeamId: 13,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'Fluminense',
  },
  awayTeam: {
    teamName: 'Corinthians',
  },
}];

export const newMatchDataMock = {
  homeTeamId: 1,
  homeTeamGoals: 0,
  awayTeamId: 2,
  awayTeamGoals: 0,
};

export const newMatchMock = {
  id: 3,
  homeTeamId: 1,
  homeTeamGoals: 0,
  awayTeamId: 2,
  awayTeamGoals: 0,
  inProgress: true,
};
