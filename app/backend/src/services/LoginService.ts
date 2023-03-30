import * as bcrypt from 'bcryptjs';
import { IUser, ILogin } from '../interfaces/IUser';
import HttpError from '../utils/HttpError';
import User from '../database/models/UserModel';
import Auth from '../auth/Auth';
import loginSchema from './validations/schemas';

export default class LoginService {
  public static async getByCredentials(credentials: ILogin): Promise<IUser | false> {
    const user: IUser | null = await User.findOne({
      where: {
        email: credentials.email,
      },
    });

    if (!user) return false;

    const checkPassword: boolean = bcrypt.compareSync(credentials.password, user.password);

    if (!checkPassword) return false;

    return user;
  }

  public static async login(credentials: ILogin): Promise<string> {
    if (!credentials.email || !credentials.password) {
      throw new HttpError(400, 'All fields must be filled');
    }

    const user: IUser | false = await LoginService.getByCredentials(credentials);
    const { error } = loginSchema.validate(credentials);

    if (!user || error) {
      throw new HttpError(401, 'Invalid email or password');
    }

    return Auth.createToken<ILogin>(credentials);
  }
}
