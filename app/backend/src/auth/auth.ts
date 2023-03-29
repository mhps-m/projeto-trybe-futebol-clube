import * as jwt from 'jsonwebtoken';
import HttpError from '../utils/HttpError';

const secret: jwt.Secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const options: jwt.SignOptions = {
  algorithm: 'HS256',
};

export default class Auth {
  public static createToken<T>(payload: T & (object | string)): string {
    const token: string = jwt.sign(payload, secret, options);
    return token;
  }

  public static authenticateToken = <T>(token: string, message: string): T => {
    if (!token) {
      throw new HttpError(401, 'Token not found');
    }

    try {
      const decoded: jwt.JwtPayload = jwt.verify(token, secret) as jwt.JwtPayload;

      return decoded as T;
    } catch (err) {
      throw new HttpError(401, message);
    }
  };
}
