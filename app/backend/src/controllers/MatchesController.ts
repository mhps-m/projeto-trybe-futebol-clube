import { Request, Response } from 'express';
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

    await MatchesService.finish(id);

    return res.status(200).json({ message: 'Finished' });
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const { id }: { id?: string } = req.params;

    await MatchesService.update(id, req.body);

    return res.status(200).json({ message: 'Updated' });
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const newMatch = await MatchesService.create(req.body);

    return res.status(201).json(newMatch);
  }
}
