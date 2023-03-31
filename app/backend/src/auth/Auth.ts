import * as jwt from 'jsonwebtoken';

const secret: jwt.Secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const options: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '30d',
};

export default class Auth {
  public static createToken<T>(payload: T & (object | string)): string {
    const token: string = jwt.sign({ data: payload }, secret, options);

    return token;
  }

  public static authenticateToken<T>(token: string): T | false {
    try {
      const decoded: jwt.JwtPayload = jwt.verify(token, secret) as jwt.JwtPayload;

      return decoded.data as T;
    } catch (err) {
      return false;
    }
  }
}
