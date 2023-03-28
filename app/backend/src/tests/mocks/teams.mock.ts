interface ITeam {
  id: number;
  teamName: string;
}

export const teamMock: ITeam = {
  id: 1,
  teamName: 'Flamengo',
};

export const teamsMock: ITeam[] = [
  {
    id: 1,
    teamName: 'Flamengo',
  },
  {
    id: 2,
    teamName: 'São Paulo',
  },
]