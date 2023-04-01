import HttpError from '../utils/HttpError';
import IMatch, { IGoals, INewMatch } from '../interfaces/IMatch';
import Match from '../database/models/MatchModel';
import { newMatchSchema, updateMatchSchema } from './validations/schemas';
import TeamsService from './TeamsService';

export default class MatchesService {
  public static async findAll(): Promise<IMatch[]> {
    const matches: Match[] = await Match.findAll({
      nest: true,
      include: { all: true, attributes: ['teamName'] },
    });

    return matches as IMatch[] & Match[];
  }

  private static async findById(id: string): Promise<IMatch | null> {
    const match: Match | null = await Match.findByPk(id, {
      nest: true,
      include: { all: true, attributes: ['teamName'] },
    });

    return match as IMatch & Match | null;
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

  private static async validateNewMatch(matchData: INewMatch): Promise<void> {
    const { error } = newMatchSchema.validate(matchData);

    if (error) throw new HttpError(400, 'All fields must be filled');

    const { homeTeamId, awayTeamId } = matchData;

    if (homeTeamId === awayTeamId) {
      throw new HttpError(422, 'It is not possible to create a match with two equal teams');
    }

    // Checks if both teams exist, throws error otherwise
    await Promise.all(
      [homeTeamId, awayTeamId].map((id) => TeamsService.findById(id)),
    );
  }

  public static async create(matchData: INewMatch): Promise<Match> {
    await MatchesService.validateNewMatch(matchData);

    const newMatch: Match = await Match.create({ ...matchData, inProgress: true });

    return newMatch;
  }
}
