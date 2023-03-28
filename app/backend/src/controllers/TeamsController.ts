import { Request, Response } from 'express';
import ITeam from '../interfaces/ITeam';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  public static async findAll(_req: Request, res: Response): Promise<Response> {
    const teams: ITeam[] = await TeamsService.findAll();

    return res.status(200).json(teams);
  }
}
