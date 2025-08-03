import { Role } from '@prisma/client';
import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsEmail(
    {},
    {
      message:
        'el campo "email" deberia tener un formato de correo electronico',
    },
  )
  email: string;

  @IsAlpha('es-ES', {
    message: 'el campo "name" deberia contener solo caracteres alfabeticos',
  })
  @IsString({ message: 'el campo "name" deberia ser una cadena de caracteres' })
  name: string;

  @IsEnum(Role, {
    message: `el campo "Role" deberia ser ${Object.values(Role)
      .join(', ')
      .replace(/, ([^,]*)$/, ' o $1')}`,
  })
  role?: Role = Role.USER;
}
