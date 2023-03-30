import { Request, Response } from 'express';
import HttpError from '../utils/HttpError';
import IMatch from '../interfaces/IMatch';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  public static async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress }: { inProgress?: string } = req.query;

    let teams: IMatch[] = await MatchesService.findAll();

    if (inProgress === 'true' || inProgress === 'false') {
      teams = [...teams].filter((team) => team.inProgress === JSON.parse(inProgress));
    }

    return res.status(200).json(teams);
  }

  public static async finish(req: Request, res: Response): Promise<Response> {
    const { id }: { id?: string } = req.params;

    const finishMatch: number = await MatchesService.finish(id);

    if (finishMatch === 0) {
      throw new HttpError(404, 'Match not found or already finished');
    }

    return res.status(200).json({ message: 'Finished' });
  }
}
