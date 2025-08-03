import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FieldsDto {
  @IsBoolean({ message: 'El campo "id" debe ser booleano.' })
  @Type(() => Boolean)
  id?: boolean = true;

  @IsBoolean({ message: 'El campo "email" debe ser booleano.' })
  @Type(() => Boolean)
  email?: boolean = true;

  @IsBoolean({ message: 'El campo "name" debe ser booleano.' })
  @Type(() => Boolean)
  name?: boolean = true;

  @IsBoolean({ message: 'El campo "role" debe ser booleano.' })
  @Type(() => Boolean)
  role?: boolean = true;

  @IsBoolean({ message: 'El campo "createdAt" debe ser booleano.' })
  @Type(() => Boolean)
  createdAt?: boolean = true;

  @IsBoolean({ message: 'El campo "updatedAt" debe ser booleano.' })
  @Type(() => Boolean)
  updatedAt?: boolean = true;

  @IsBoolean({ message: 'El campo "password" debe ser booleano.' })
  @Type(() => Boolean)
  password?: boolean = false;
}
