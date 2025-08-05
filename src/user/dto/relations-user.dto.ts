import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class RelationsUserDto {
  @IsBoolean({ message: 'El campo "albums" debe ser booleano.' })
  @Type(() => Boolean)
  albums?: boolean = false;
}
