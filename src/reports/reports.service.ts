import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './create-user.dto';
@Injectable()
export class ReportsService {
     constructor(
        @InjectRepository(Report)
        private readonly reportsRepository: Repository<Report>,
    ) { }
    async createReport(report: CreateReportDto) {
        const newReport = this.reportsRepository.create(report);
        await this.reportsRepository.save(newReport);
        return newReport;
    }

}
