import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/modules/auth/guards/gqlAuth.guard'
import { CreateCourseDTO } from '../dtos/createCourse.dto'
import { Course } from '../entities/course.entity'
import { CoursesService } from '../services/courses.service'

@UseGuards(GqlAuthGuard)
@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CoursesService) {}

  @Query(() => [Course])
  public async getCourses(): Promise<Course[]> {
    const courses = await this.courseService.getAllCourses()

    console.log(courses)

    return courses
  }

  @Mutation(() => Course)
  public async createCourse(
    @Args('createCourse') data: CreateCourseDTO
  ): Promise<Course> {
    const newCourse = await this.courseService.createCourse(data, null)

    return newCourse
  }
}
