import { BadRequestException, Injectable } from '@nestjs/common'
import { Lesson } from 'src/modules/lessons/entities/lesson.entity'
import { CreateCourseDTO } from '../dtos/createCourse.dto'
import { UpdateCourseDTO } from '../dtos/updateCourse.dto'
import { Course } from '../entities/course.entity'
import { SubscriberCourseDTO } from '../dtos/subscriberCourse.dto'
import { CourseRepository } from '../repositories/course.repository'
import { UsersService } from 'src/modules/users/services/users.service'
import { UploadService } from 'src/shared/providers/upload/upload.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CourseCategory } from '../entities/courseCategory.entity'

@Injectable()
export class CoursesService {
  constructor(
    private readonly usersService: UsersService,
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
      relations: ['lessons', 'users', 'courseCategory'],
    })

    return courses
  }

  public async getAllLessonsByCourseId(id: string): Promise<Lesson[]> {
    const course = await this.courseRepository.findOne(id, {
      relations: ['lessons', 'users'],
    })

    return course.lessons
  }

  public async subscriberCourse({
    courseId,
    userId,
  }: SubscriberCourseDTO): Promise<Course> {
    const currentCourse = await this.courseRepository.findOne(courseId)

    const currentUser = await this.usersService.findById(userId)

    currentCourse.users = [currentUser]

    await this.courseRepository.save(currentCourse)

    return currentCourse
  }

  public async unSubscribeCourse({
    courseId,
    userId,
  }: SubscriberCourseDTO): Promise<Course> {
    const currentCourse = await this.courseRepository.findOne(courseId, {
      relations: ['users'],
    })

    currentCourse.users = currentCourse.users.filter(user => user.id !== userId)

    await this.courseRepository.save(currentCourse)

    return currentCourse
  }
}
