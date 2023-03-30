import IMatch from '../interfaces/IMatch';
import Match from '../database/models/MatchModel';

export default class MatchesService {
  public static async findAll(): Promise<IMatch[]> {
    const teams = await Match.findAll({
      raw: true,
      nest: true,
      include: { all: true, attributes: ['teamName'] },
    }) as IMatch[] & Match[];

    return teams;
  }
}
