import { IsJWT } from 'class-validator';

export class AccessTokenResponseDto {
  @IsJWT({
    message: 'el campo "access_token" deberia ser un formato valido de JWT',
  })
  access_token: string;
}
