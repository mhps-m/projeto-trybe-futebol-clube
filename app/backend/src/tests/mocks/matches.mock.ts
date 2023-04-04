export const matchesMock = [{
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'Flamengo ',
  },
  awayTeam: {
    teamName: 'São Paulo',
  },
},
{
  id: 2,
  homeTeamId: 3,
  homeTeamGoals: 1,
  awayTeamId: 6,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'Cruzeiro',
  },
  awayTeam: {
    teamName: 'Fluminense',
  },
},
{
  id: 3,
  homeTeamId: 4,
  homeTeamGoals: 3,
  awayTeamId: 5,
  awayTeamGoals: 0,
  inProgress: false,
  homeTeam: {
    teamName: 'Corinthians',
  },
  awayTeam: {
    teamName: 'Vasco da Gama',
  },
},
{
  id: 4,
  homeTeamId: 3,
  homeTeamGoals: 0,
  awayTeamId: 2,
  awayTeamGoals: 0,
  inProgress: false,
  homeTeam: {
    teamName: 'Cruzeiro',
  },
  awayTeam: {
    teamName: 'São Paulo',
  },
},
{
  id: 5,
  homeTeamId: 5,
  homeTeamGoals: 1,
  awayTeamId: 1,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'Vasco da Gama',
  },
  awayTeam: {
    teamName: 'Flamengo',
  },
},
{
  id: 6,
  homeTeamId: 2,
  homeTeamGoals: 1,
  awayTeamId: 4,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'São Paulo',
  },
  awayTeam: {
    teamName: 'Corinthians',
  },
},
{
  id: 7,
  homeTeamId: 3,
  homeTeamGoals: 2,
  awayTeamId: 6,
  awayTeamGoals: 2,
  inProgress: false,
  homeTeam: {
    teamName: 'Cruzeiro',
  },
  awayTeam: {
    teamName: 'Fluminense',
  },
},
{
  id: 8,
  homeTeamId: 6,
  homeTeamGoals: 0,
  awayTeamId: 1,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: 'Fluminense',
  },
  awayTeam: {
    teamName: 'Flamengo',
  },
},
{
  id: 9,
  homeTeamId: 2,
  homeTeamGoals: 0,
  awayTeamId: 5,
  awayTeamGoals: 3,
  inProgress: true,
  homeTeam: {
    teamName: 'São Paulo',
  },
  awayTeam: {
    teamName: 'Vasco da Gama',
  },
}];

export const inProgressMock = {
  id: 9,
  homeTeamId: 2,
  homeTeamGoals: 0,
  awayTeamId: 5,
  awayTeamGoals: 3,
  inProgress: true,
  homeTeam: {
    teamName: 'São Paulo',
  },
  awayTeam: {
    teamName: 'Vasco da Gama',
  },
};

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
