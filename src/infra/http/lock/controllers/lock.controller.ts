/* eslint-disable prettier/prettier */
import { CreateLock } from '@app/use-cases/lock/create-lock';
import { DeleteLock } from '@app/use-cases/lock/delete-lock';
import { FindLockById } from '@app/use-cases/lock/find-by-id';
import { ListAllLocks } from '@app/use-cases/lock/list-all-locks';
import { UpdateLock } from '@app/use-cases/lock/update-lock';
import { UpdateLockState } from '@app/use-cases/lock/update-lock-state';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateLockBody } from '../dtos/update-lock-body';
import { UpdateLockStateBody } from '../dtos/update-lock-state-body';
import { LockViewModel, LockWithClassroomViewModel } from '../view-models/lock-view-model';

@ApiTags('lock')
@Controller('lock')
export class LockController {
  constructor(
    private createLockUseCase: CreateLock,
    private updateLockUseCase: UpdateLock,
    private deleteLockUseCase: DeleteLock,
    private findLockByIdUseCase: FindLockById,
    private updateLockStateUseCase: UpdateLockState,
    private listAllLocksUseCase: ListAllLocks,
    ) { }


  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body): Promise<LockWithClassroomViewModel> {
    const { name, classroomId } = body;
    const { lockId } = await this.createLockUseCase.execute({
      name,
      classroomId,
    });

    return { id: lockId };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiBody({ type: UpdateLockBody })
  @Patch()
  async update(
    @Body() body: UpdateLockBody,
  ): Promise<void> {
    const { id, name, state, classroomId } = body;

    await this.updateLockUseCase.execute({
      lockId: id,
      name: name,
      state: state,
      classroomId: classroomId
    });
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiBody({ type: UpdateLockStateBody })
  @Patch('state')
  async updateState(
    @Body() body: UpdateLockStateBody,
  ): Promise<void> {
    const { lockId, state} = body;

    await this.updateLockStateUseCase.execute({
      lockId: lockId,
      state: state,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<void> {

    await this.deleteLockUseCase.execute({
      id
    });

  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(
    @Param('id') id: string,
  ): Promise<LockViewModel> {

    const { lock } = await this.findLockByIdUseCase.execute({
      lockId: id
    });

    return LockViewModel.toHTTP(lock)
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async listAll(): Promise<LockViewModel[]> {

    const { locks } = await this.listAllLocksUseCase.execute();

    return locks.map(LockWithClassroomViewModel.toHTTP)
  }

  
}
