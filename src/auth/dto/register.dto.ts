import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
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

  @IsEmail(undefined, {
    message: 'el campo "email" deberia tener un formato de correo electronico',
  })
  @IsNotEmpty({ message: 'el campo "email" es obligatorio' })
  @MaxLength(255, {
    message: 'el campo "email" no puede superar los 255 caracteres',
  })
  email: string;

  @Matches(/^[\p{L}\p{M}\s'-]+$/u, {
    message:
      'el campo "name" deberia contener solo guiones, apóstofres, letras y espacios',
  })
  @IsNotEmpty({ message: 'el campo "name" es obligatorio' })
  @IsString({ message: 'el campo "name" deberia ser una cadena de caracteres' })
  name: string;

  @IsEnum(Role, {
    message: `el campo "Role" deberia ser ${Object.values(Role)
      .join(', ')
      .replace(/, ([^,]*)$/, ' o $1')}`,
  })
  role: Role = Role.USER;
}
