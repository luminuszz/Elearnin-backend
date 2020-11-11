import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common'
import { UpdateLessonDTO } from '../dtos/updateLesson.dto'
import { LessonsService } from '../services/lessons.service'

@Injectable()
export class UpdateFormatter
  implements PipeTransform<UpdateLessonDTO, unknown> {
  constructor(private readonly lessonsService: LessonsService) {}

  public async transform(value: UpdateLessonDTO): Promise<unknown> {
    const currentLesson = await this.lessonsService.findLessonById(value.id)

    if (!currentLesson) {
      throw new BadRequestException('Lesson not found')
    }

    Object.keys(value).forEach(item => {
      if (value[item]) {
        currentLesson[item] = value[item]
      }
    })

    return currentLesson as unknown
  }
}
