import { Body, Controller, Post } from '@nestjs/common'
import { CreateLessonDTO } from '../dtos/createLesson.dto'
import { Lesson } from '../entities/lesson.entity'
import { UpdateFormatter } from '../pipes/updateFormater.pipe'
import { LessonsService } from '../services/lessons.service'

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  public async createLesson(@Body() data: CreateLessonDTO): Promise<Lesson> {
    const newLesson = await this.lessonsService.createLesson(data)

    return newLesson
  }

  @Post('update')
  public async UpdateLesson(
    @Body(UpdateFormatter) data: Lesson
  ): Promise<Lesson> {
    const updatedLesson = await this.lessonsService.updateLesson(data)

    return updatedLesson
  }
}
