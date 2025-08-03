import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'La contraseña actual debe ser un string' })
  currentPassword: string;

  @IsString({ message: 'La nueva contraseña debe ser un string' })
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres',
  })
  newPassword: string;
}
