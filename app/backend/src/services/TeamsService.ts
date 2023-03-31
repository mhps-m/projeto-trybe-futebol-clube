import HttpError from '../utils/HttpError';
import Team from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  public static async findAll(): Promise<ITeam[]> {
    const teams: ITeam[] = await Team.findAll();

    return teams;
  }

  public static async findById(id: string | number): Promise<ITeam> {
    const team: ITeam | null = await Team.findByPk(id);

    if (!team) throw new HttpError(404, 'There is no team with such id!');

    return team;
  }
}
