import { Module } from '@nestjs/common'
import { LessonsService } from './services/lessons.service'
import { LessonsController } from './controllers/lessons.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from './entities/lesson.entity'
import { UpdateFormatter } from './pipes/updateFormater.pipe'

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  providers: [LessonsService, UpdateFormatter],
  controllers: [LessonsController],
})
export class LessonsModule {}
