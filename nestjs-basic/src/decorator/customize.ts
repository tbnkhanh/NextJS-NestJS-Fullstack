import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

//decorator to set the API without authentication
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); //key:value

//decorator to return req.user
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
