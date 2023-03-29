import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import LoginService from '../services/LoginService';
import Auth from '../auth/Auth';
import HttpError from '../utils/HttpError';

export default async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token: string | undefined = req.header('Authorization');

  if (!token) throw new HttpError(401, 'Token not found');

  const decoded: IUser | false = Auth.authenticateToken<IUser>(token);

  if (!decoded) throw new HttpError(401, 'Token must be a valid token');

  const user: IUser | false = await LoginService.getByCredentials(decoded);

  if (!user) throw new HttpError(401, 'Token must be a valid token');

  res.locals.user = user;

  next();
}
