import * as bcrypt from 'bcryptjs';
import { IUser, ILogin } from '../interfaces/IUser';
import HttpError from '../utils/HttpError';
import User from '../database/models/UserModel';
import Auth from '../auth/Auth';
import loginSchema from './validations/schemas';

export default class LoginService {
  private static async verifyCredentials(credentials: ILogin): Promise<boolean> {
    const user: IUser | null = await User.findOne({ where: {
      email: credentials.email,
    } });

    if (!user) return false;

    const checkPassword: boolean = bcrypt.compareSync(credentials.password, user.password);

    return checkPassword;
  }

  public static async login(credentials: ILogin): Promise<string> {
    if (!credentials.email || !credentials.password) {
      throw new HttpError(400, 'All fields must be filled');
    }

    const verifyCredentials = await LoginService.verifyCredentials(credentials);
    const { error } = loginSchema.validate(credentials);

    if (!verifyCredentials || error) {
      throw new HttpError(401, 'Invalid email or password');
    }

    return Auth.createToken<ILogin>(credentials);
  }
}
