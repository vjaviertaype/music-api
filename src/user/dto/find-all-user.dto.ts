import { Type } from 'class-transformer';
import {
  IsOptional,
  IsEmail,
  IsString,
  IsBoolean,
  IsDate,
  IsInt,
  IsIn,
  Min,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { RelationsDto } from './relations.dto';
import { FieldsDto } from './fields.dto';

export class FindAllUsersDto {
  @IsOptional()
  @IsUUID('4', {
    message: 'El campo "id" debe tener un fromato válido de UUID v4',
  })
  id?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message:
        'El campo "email" debe tener un formato válido de correo electrónico.',
    },
  )
  email?: string;

  @IsOptional()
  @IsString({ message: 'El campo "name" debe ser una cadena de texto.' })
  name?: string;

  @IsOptional()
  @IsBoolean({
    message: 'El campo "isActive" debe ser true o false (booleano).',
  })
  @Type(() => Boolean)
  isActive?: boolean;

  @IsOptional()
  @IsDate({
    message:
      'El campo "createdAfter" debe ser una fecha válida (ej: 2023-01-01).',
  })
  @Type(() => Date)
  createdAfter?: Date;

  @IsOptional()
  @IsDate({
    message:
      'El campo "createdBefore" debe ser una fecha válida (ej: 2023-12-31).',
  })
  @Type(() => Date)
  createdBefore?: Date;

  @IsInt({
    message: 'El campo "skip" debe ser un número entero mayor o igual a 0.',
  })
  @Min(0, { message: 'El valor mínimo de "skip" es 0.' })
  @Type(() => Number)
  skip: number = 0;

  @IsInt({
    message: 'El campo "take" debe ser un número entero mayor o igual a 1.',
  })
  @Min(1, { message: 'El valor mínimo de "take" es 1.' })
  @Type(() => Number)
  take: number = 10;

  @IsIn(['createdAt', 'email'], {
    message: 'El campo "orderBy" solo puede ser "createdAt" o "email".',
  })
  orderBy: 'createdAt' | 'email' = 'createdAt';

  @IsIn(['asc', 'desc'], {
    message:
      'El campo "orderDirection" solo puede ser "asc" (ascendente) o "desc" (descendente).',
  })
  orderDirection: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @ValidateNested()
  @Type(() => RelationsDto)
  relations?: RelationsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FieldsDto)
  fields?: FieldsDto;
}
