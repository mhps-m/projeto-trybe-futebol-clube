import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response): Promise<Response> {
    const token = await LoginService.login(req.body);

    return res.status(200).json({ token });
  }
}
