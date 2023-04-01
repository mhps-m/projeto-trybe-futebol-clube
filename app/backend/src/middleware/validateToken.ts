import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces';
import { LoginService } from '../services';
import Auth from '../auth/Auth';
import { HttpError } from '../utils';

export default async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token: string | undefined = req.header('authorization');
  if (!token) throw new HttpError(401, 'Token not found');

  const decoded: IUser | false = Auth.authenticateToken<IUser>(token);
  if (!decoded) throw new HttpError(401, 'Token must be a valid token');

  const user: IUser | false = await LoginService.getByCredentials(decoded);
  if (!user) throw new HttpError(401, 'Token must be a valid token');

  res.locals.user = user;
  next();
}
