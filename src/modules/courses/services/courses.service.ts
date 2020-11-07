import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from 'src/modules/lessons/entities/lesson.entity'
import { Repository } from 'typeorm'
import { CreateCourseDTO } from '../dtos/createCourse.dto'
import { UpdateCourseDTO } from '../dtos/updateCourse.dto'
import { Course } from '../entities/course.entity'

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  public async createCourse(
    { description, name }: CreateCourseDTO,
    courseImage: string
  ): Promise<Course> {
    const newCourse = this.courseRepository.create({
      description,
      name,
      image: courseImage,
    })

    await this.courseRepository.save(newCourse)

    return newCourse
  }

  public async updateCourse({
    courseId,
    description,
    name,
  }: UpdateCourseDTO): Promise<Course> {
    const currentCourse = await this.courseRepository.findOne(courseId)

    if (!currentCourse) {
      throw new BadRequestException('Course not found')
    }
    currentCourse.description = description
    currentCourse.name = name

    await this.courseRepository.save(currentCourse)

    return currentCourse
  }

  public async getAllCourses(): Promise<Course[]> {
    const courses = await this.courseRepository.find({ relations: ['lessons'] })

    return courses
  }

  public async getAllLessonsByCourseId(id: string): Promise<Lesson[]> {
    const course = await this.courseRepository.findOne(id, {
      relations: ['lessons'],
    })

    return course.lessons
  }
}
