import IMatch from '../interfaces/IMatch';
import Match from '../database/models/MatchModel';

export default class MatchesService {
  public static async findAll(): Promise<IMatch[]> {
    const teams: Match[] = await Match.findAll({
      nest: true,
      include: { all: true, attributes: ['teamName'] },
    });

    return teams as IMatch[] & Match[];
  }

  public static async finish(id: string): Promise<number> {
    const [affectedCount] = await Match.update(
      { inProgress: false },
      { where: { id } },
    );

    return affectedCount;
  }
}
