import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class RelationsDto {
  @IsBoolean({ message: 'El campo "albums" debe ser booleano.' })
  @Type(() => Boolean)
  albums?: boolean = false;

  @IsBoolean({ message: 'El campo "subscriptions" debe ser booleano.' })
  @Type(() => Boolean)
  subscriptions?: boolean = false;

  @IsBoolean({ message: 'El campo "followers" debe ser booleano.' })
  @Type(() => Boolean)
  followers?: boolean = false;

  @IsBoolean({ message: 'El campo "notifications" debe ser booleano.' })
  @Type(() => Boolean)
  notifications?: boolean = false;
}
