import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import environment from 'environment';
import { getConnectionOptions } from 'typeorm';
import { DamageReportModule } from './damage-report/damage-report.module';
import { APP_PIPE } from '@nestjs/core';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [() => environment],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...(await getConnectionOptions()),
        synchronize: false,
        migrationsRun: true,
        logging: 'all',
      }),
    }),
    DamageReportModule,
    GlobalModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
