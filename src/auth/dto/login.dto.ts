import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail(
    {},
    {
      message:
        'el campo "email" deberia tener un formado de correo electronico',
    },
  )
  @IsNotEmpty({ message: 'el campo "email" no debe ser una cadena vacia' })
  email: string;

  @IsString({ message: 'el campo "password" deberia ser una cadena de texto' })
  @IsNotEmpty({ message: 'el campo "password" no debe ser una cadena vacia' })
  password: string;
}
