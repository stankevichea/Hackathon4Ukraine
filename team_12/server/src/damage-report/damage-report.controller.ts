import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  RequestIp,
  RequestIpParam,
} from 'shared/decorators/request-ip.decorator';
import { CreateDamageReportDto } from 'damage-report/dto/create-damage-report.dto';

import { DamageReportService } from 'damage-report/damage-report.service';
import type { DamageReportDto } from 'damage-report/dto/damage-report.dto';
import type { AvailablePlaceDto } from 'damage-report/dto/available-place.dto';

@Controller('damage-report')
export class DamageReportController {
  constructor(private readonly damageReportService: DamageReportService) {}

  @Get()
  async getDamageReports(): Promise<DamageReportDto[]> {
    const damageReportEntities =
      await this.damageReportService.getDamageReports();
    return damageReportEntities.map(({ entity, features }) => ({
      ...entity.getDTO(),
      ...features,
    }));
  }

  @Get('available-place')
  // todo replace query parsing in getAvailablePlaces with class validator and do it type-safe
  async getAvailablePlaces(@Query() query: any): Promise<AvailablePlaceDto[]> {
    const searchText = query.searchText;
    const minLon = parseFloat(query.minLon);
    const maxLon = parseFloat(query.maxLon);
    const minLat = parseFloat(query.minLat);
    const maxLat = parseFloat(query.maxLat);
    return (
      await this.damageReportService.getLocationsInBoundingBox({
        searchText,
        bbox: {
          minLon,
          minLat,
          maxLat,
          maxLon,
        },
      })
    ).map((location) => ({
      ...location,
      placeName: location.name,
      placeCategory: location.category || null,
    }));
  }

  @Post()
  async createDamageReport(
    @Body() data: CreateDamageReportDto,
    @RequestIp() requestIp: RequestIpParam,
  ): Promise<DamageReportDto> {
    const newDamageReport = await this.damageReportService.createDamageReport({
      latitude: data.latitude,
      longitude: data.longitude,
      damageDegree: data.damageDegree,
      description: data.description,
      reporterIp: requestIp || undefined,
    });
    return newDamageReport.getDTO();
  }
}
