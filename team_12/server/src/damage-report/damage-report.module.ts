import { Module } from '@nestjs/common';
import { DamageReportController } from './damage-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DamageReportEntity } from 'damage-report/damage-report.entity';
import { DamageReportRepository } from 'damage-report/damage-report.repository';
import { DamageReportService } from './damage-report.service';

@Module({
  imports: [TypeOrmModule.forFeature([DamageReportEntity])],
  providers: [DamageReportRepository, DamageReportService],
  controllers: [DamageReportController],
})
export class DamageReportModule {}
