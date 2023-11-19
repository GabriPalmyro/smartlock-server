/* eslint-disable prettier/prettier */
import { CreateAlert } from '@app/use-cases/alerts/create-alert';
import { ListAllAlerts } from '@app/use-cases/alerts/list-all-alerts';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateAlertBody } from '../dtos/create-alert-body';
import { AlertViewModel } from '../view-models/alert-view-model';

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
  constructor(
    readonly createAlertUseCase: CreateAlert,
    readonly listAllAlertsUseCase: ListAllAlerts,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateAlertBody })
  @Post()
  async create(@Body() body: CreateAlertBody): Promise<void> {
    const { message, classroomId } = body;

    await this.createAlertUseCase.execute({
      message,
      classroomId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async listAll(): Promise<AlertViewModel> {
    const { alerts } = await this.listAllAlertsUseCase.execute();
    return alerts.map(AlertViewModel.toHTTP);
  }
}
