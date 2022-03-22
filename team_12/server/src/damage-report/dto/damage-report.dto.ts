import { DamageDegree } from 'damage-report/damage-degree.enum';

export class DamageReportDto {
  id: string;
  latitude: number;
  longitude: number;
  damageDegree: `${DamageDegree}`;
  description: string | null;
}
