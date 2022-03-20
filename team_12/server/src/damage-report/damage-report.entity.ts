import { BaseEntity } from 'shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';
import type { Point } from 'geojson';
import { DamageDegree } from 'damage-report/damage-degree.enum';
import { DamageReportDto } from 'damage-report/dto/damage-report.dto';

@Entity({
  name: 'damage-report',
})
export class DamageReportEntity extends BaseEntity<DamageReportDto> {
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
  })
  point: Point;

  @Column({
    type: 'enum',
    enum: DamageDegree,
  })
  damageDegree: `${DamageDegree}`;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  reporterIp: string | null;

  getDTO(): DamageReportDto {
    return {
      id: this.id,
      damageDegree: this.damageDegree,
      latitude: this.point.coordinates[0],
      longitude: this.point.coordinates[1],
      description: this.description || null,
    };
  }
}
