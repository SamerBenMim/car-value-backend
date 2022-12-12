import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Report])],//create repository for reports
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
