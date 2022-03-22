import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository, SelectQueryBuilder } from 'typeorm';

import { DamageReportEntity } from 'damage-report/damage-report.entity';
import { CreateDamageReportDto } from 'damage-report/dto/create-damage-report.dto';

@Injectable()
@EntityRepository()
export class DamageReportRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async findMany(): Promise<DamageReportEntity[]> {
    return this.createQueryBuilder('damageReport').getMany();
  }

  async createAndSaveOne(
    data: CreateDamageReportDto & { reporterIp?: string },
  ): Promise<DamageReportEntity> {
    const newDamageReport = await this.entityManager.create(
      DamageReportEntity,
      {
        damageDegree: data.damageDegree,
        point: {
          type: 'Point',
          coordinates: [data.latitude, data.longitude],
        },
        reporterIp: data.reporterIp,
        description: data.description,
      },
    );
    return this.entityManager.save(newDamageReport);
  }

  private createQueryBuilder(
    alias?: string,
  ): SelectQueryBuilder<DamageReportEntity> {
    return this.entityManager
      .getRepository(DamageReportEntity)
      .createQueryBuilder(alias);
  }
}
