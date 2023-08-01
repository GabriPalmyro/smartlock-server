import { Class } from '@app/entities/class';
import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';

interface ListAllClassessResponse {
  classes: Class[];
}

@Injectable()
export class ListAllClassess {
  constructor(private classRepository: ClassRepository) {}

  async execute(): Promise<ListAllClassessResponse> {
    const classes = await this.classRepository.listAll();

    return { classes };
  }
}
