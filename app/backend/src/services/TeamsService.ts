import Team from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  public static async findAll(): Promise<ITeam[]> {
    const teams: ITeam[] = await Team.findAll();
    return teams;
  }
}
