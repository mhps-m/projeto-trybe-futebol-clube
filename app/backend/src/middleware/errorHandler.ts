import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils';

export default function errorHandler(
  err: HttpError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  return res
    .status((err as HttpError).status || 500)
    .json({ message: err.message });
}
