import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN'),
    });
  }

  // Ham duoc thuc thi neu ham ben tren decoded thanh cong
  async validate(payload: IUser) {
    const { _id, name, email, role } = payload;
    //gan vao req.user
    return {
      _id,
      name,
      email,
      role,
    };
  }
}
