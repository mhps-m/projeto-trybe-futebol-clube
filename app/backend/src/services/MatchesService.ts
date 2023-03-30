import HttpError from '../utils/HttpError';
import IMatch, { IGoals } from '../interfaces/IMatch';
import Match from '../database/models/MatchModel';
import { updateMatchSchema } from './validations/schemas';

export default class MatchesService {
  public static async findAll(): Promise<IMatch[]> {
    const teams: Match[] = await Match.findAll({
      nest: true,
      include: { all: true, attributes: ['teamName'] },
    });

    return teams as IMatch[] & Match[];
  }

  private static async findById(id: string): Promise<IMatch | null> {
    const team: Match | null = await Match.findByPk(id, {
      nest: true,
      include: { all: true, attributes: ['teamName'] },
    });

    return team as IMatch & Match | null;
  }

  public static async finish(id: string): Promise<number> {
    const findMatch = await MatchesService.findById(id);

    if (!findMatch || findMatch.inProgress === false) {
      throw new HttpError(404, 'Match not found or already finished');
    }

    const [affectedCount] = await Match.update(
      { inProgress: false },
      { where: { id } },
    );

    return affectedCount;
  }

  public static async update(id: string, goals: IGoals): Promise<number> {
    const { error } = updateMatchSchema.validate(goals);

    if (error) throw new HttpError(400, 'Missing a new goal value to at least one of the teams');

    const findMatch = await MatchesService.findById(id);

    if (!findMatch || findMatch.inProgress === false) {
      throw new HttpError(404, 'Match not found or already finished');
    }

    const [affectedCount] = await Match.update(
      { ...goals },
      { where: { id } },
    );

    return affectedCount;
  }
}
