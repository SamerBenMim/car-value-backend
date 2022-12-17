import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './create-user.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.gard';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }
    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto) {
        return this.reportsService.createReport(body);
    }


}
