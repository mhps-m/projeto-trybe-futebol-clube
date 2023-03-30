import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  public static async findAll(_req: Request, res: Response): Promise<Response> {
    const teams = await MatchesService.findAll();

    return res.status(200).json(teams);
  }
}
