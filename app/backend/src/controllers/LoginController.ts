import { Request, Response } from 'express';
import { IUser } from '../interfaces';
import { LoginService } from '../services';

export default class LoginController {
  public static async login(req: Request, res: Response): Promise<Response> {
    const token: string = await LoginService.login(req.body);

    return res.status(200).json({ token });
  }

  public static async getRole(req: Request, res: Response): Promise<Response> {
    const user: IUser = res.locals.user as IUser;

    const { role } = user;

    return res.status(200).json({ role });
  }
}
