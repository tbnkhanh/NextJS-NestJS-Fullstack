import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    if (user) {
      const isValid = this.usersService.checkPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("Username or password is invalid");
    }
    return user; // gan vao req.user
  }
}
