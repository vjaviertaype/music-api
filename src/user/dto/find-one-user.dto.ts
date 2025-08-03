import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { RelationsDto } from './relations.dto';
import { FieldsDto } from './fields.dto';

class UniqueFilterDto {
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
}

export class findOneUserDto {
  uniqueFilter: UniqueFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RelationsDto)
  relations?: RelationsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FieldsDto)
  fields?: FieldsDto;
}
