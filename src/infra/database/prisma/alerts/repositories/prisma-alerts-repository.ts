import { AlertRepository } from '@app/repositories/alerts_repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { Alerts } from '@app/entities/alert';
import { PrismaAlertsMapper } from '../mappers/prisma-alerts-mapper';

@Injectable()
export class PrismaAlertsRepositories implements AlertRepository {
  constructor(private prismaService: PrismaService) {}
  async create(alert: Alerts): Promise<void> {
    const prismaAlerta = PrismaAlertsMapper.toPrisma(alert);

    await this.prismaService.alerts.create({
      data: prismaAlerta,
    });
  }

  update(alert: Alerts): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(alertId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async listAll(): Promise<Alerts[]> {
    const alerts = await this.prismaService.alerts.findMany();
    return alerts.map(PrismaAlertsMapper.toDomain);
  }

  findById(alertId: string): Promise<Alerts> {
    throw new Error('Method not implemented.');
  }
}
