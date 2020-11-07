import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateLessonDTO } from '../dtos/createLesson.dto'
import { Lesson } from '../entities/lesson.entity'

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>
  ) {}

  public async createLesson({
    courseId,
    description,
    duration,
    name,
    videoId,
  }: CreateLessonDTO): Promise<Lesson> {
    const newLesson = this.lessonsRepository.create({
      description,
      duration,
      name,
      videoId,
      courseId,
    })

    await this.lessonsRepository.save(newLesson)

    return newLesson
  }

  public async findLessonById(id: string): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOne(id)

    return lesson
  }

  public async updateLesson(data: Lesson): Promise<Lesson> {
    await this.lessonsRepository.save(data)

    return data
  }
}
