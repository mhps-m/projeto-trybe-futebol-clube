import * as bcrypt from 'bcryptjs';
import { IUser, ILogin } from '../interfaces/IUser';
import HttpError from '../utils/HttpError';
import User from '../database/models/UserModel';
import Auth from '../auth/auth';

export default class LoginService {
  private static async checkCredentials(credentials: ILogin): Promise<boolean> {
    const user: IUser | null = await User.findOne({ where: {
      email: credentials.email,
    } });

    if (!user) return false;

    const checkPassword: boolean = bcrypt.compareSync(credentials.password, user.password);

    return checkPassword;
  }

  public static async login(credentials: ILogin): Promise<string> {
    const checkCredentials = LoginService.checkCredentials(credentials);

    if (!checkCredentials) throw new HttpError(401, 'Invalid email or password');

    return Auth.createToken<ILogin>(credentials);
  }
}
