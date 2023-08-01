import { CreateLock } from '@app/use-cases/lock/create-lock';
import { DeleteLock } from '@app/use-cases/lock/delete-lock';
import { FindLockById } from '@app/use-cases/lock/find-by-id';
import { ListAllLocks } from '@app/use-cases/lock/list-all-locks';
import { UpdateLock } from '@app/use-cases/lock/update-lock';
import { UpdateLockState } from '@app/use-cases/lock/update-lock-state';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { LockController } from './controllers/lock.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [LockController],
  providers: [
    CreateLock,
    FindLockById,
    ListAllLocks,
    UpdateLock,
    UpdateLockState,
    DeleteLock,
  ],
})
export class LockModule {}
