import { Request, Response } from 'express';
import { ITeam } from '../interfaces';
import { TeamsService } from '../services';

export default class TeamsController {
  public static async findAll(_req: Request, res: Response): Promise<Response> {
    const teams: ITeam[] = await TeamsService.findAll();

    return res.status(200).json(teams);
  }

  public static async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team: ITeam = await TeamsService.findById(id);

    return res.status(200).json(team);
  }
}
