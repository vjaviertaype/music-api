import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail({}, { message: '"email" debería ser un correo válido.' })
  @IsNotEmpty({ message: '"email" es obligatorio.' })
  email: string;

  @IsString({ message: '"password" debe ser una cadena de texto.' })
  @MinLength(6, { message: '"password" debe tener al menos 6 caracteres.' })
  password: string;

  @IsOptional()
  @IsString({ message: '"name" debe ser una cadena de texto.' })
  @Transform(({ value }) => value?.trim())
  name?: string;

  @IsEnum(Role, { message: '"role" debe ser un valor válido.' })
  role?: Role = Role.USER;
}
