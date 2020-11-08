import { BadRequestException, Injectable } from '@nestjs/common'
import { Lesson } from 'src/modules/lessons/entities/lesson.entity'
import { CreateCourseDTO } from '../dtos/createCourse.dto'
import { UpdateCourseDTO } from '../dtos/updateCourse.dto'
import { Course } from '../entities/course.entity'
import { SubscriberCourseDTO } from '../dtos/subscriberCourse.dto'
import { CourseRepository } from '../repositories/course.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/modules/users/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly courseRepository: CourseRepository
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
    const courses = await this.courseRepository.find({
      relations: ['lessons', 'users'],
    })

    return courses
  }

  public async getAllLessonsByCourseId(id: string): Promise<Lesson[]> {
    const course = await this.courseRepository.findOne(id, {
      relations: ['lessons'],
    })

    return course.lessons
  }

  public async subscriberCourse({
    courseId,
    userId,
  }: SubscriberCourseDTO): Promise<Course> {
    const currentCourse = await this.courseRepository.findOne(courseId)

    const currentUser = await this.userRepository.findOne(userId)

    currentCourse.users = [currentUser]

    await this.courseRepository.save(currentCourse)

    return currentCourse
  }
}
