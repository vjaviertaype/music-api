import { IsEmail, IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail(
    {},
    {
      message: 'El campo "email" debe tener un formato válido',
    },
  )
  @IsNotEmpty({ message: 'El campo "email" es obligatorio' })
  @MaxLength(255, {
    message: 'El campo "email" no puede superar los 255 caracteres',
  })
  email: string;

  @IsString({ message: 'El campo "password" debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo "password" es obligatorio' })
  password: string;
}
