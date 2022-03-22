import { DamageDegree } from 'damage-report/damage-degree.enum';
import {
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDamageReportDto {
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsEnum(DamageDegree)
  @IsNotEmpty()
  damageDegree: `${DamageDegree}`;

  @IsString()
  @MaxLength(500)
  description: string;
}
