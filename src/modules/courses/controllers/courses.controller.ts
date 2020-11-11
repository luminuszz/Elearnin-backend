import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CoursesService } from '../services/courses.service'
import { fileResolver } from 'src/shared/utils/fileFormatet.utils'
import { CreateCourseDTO } from '../dtos/createCourse.dto'
import { Course } from '../entities/course.entity'
import { UpdateCourseDTO } from '../dtos/updateCourse.dto'
import { Lesson } from 'src/modules/lessons/entities/lesson.entity'
import { AuthDeclaration } from 'src/modules/auth/decorators/authDeclaration.decorator'
import { SubscriberCourseDTO } from '../dtos/subscriberCourse.dto'
import { MatchUuid } from '../guards/matchId.guard'
import { UploadService } from 'src/shared/providers/upload/upload.service'

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly courseService: CoursesService,
    private readonly uploadService: UploadService
  ) {}

  @Post()
  @AuthDeclaration('jwt', 'admin')
  @UseInterceptors(FileInterceptor('file', fileResolver))
  public async createCourse(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateCourseDTO
  ): Promise<Course> {
    const newCourse = await this.courseService.createCourse(
      data,
      file ? file.filename : ''
    )

    if (file) {
      await this.uploadService.saveFile(file.filename)
    }

    return newCourse
  }

  @Post('update')
  @AuthDeclaration('jwt', 'admin')
  public async updateCourse(@Body() data: UpdateCourseDTO): Promise<Course> {
    const updatedCourse = await this.courseService.updateCourse(data)

    return updatedCourse
  }

  @AuthDeclaration('jwt', 'user')
  @Get()
  public async getAllCourses(): Promise<Course[]> {
    const courses = await this.courseService.getAllCourses()

    return courses
  }

  @AuthDeclaration('jwt', 'user')
  @Get(':id/lessons')
  public async getAllLessonsByCourseId(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<Lesson[]> {
    const lessons = await this.courseService.getAllLessonsByCourseId(id)

    return lessons
  }

  @AuthDeclaration('jwt')
  @UseGuards(MatchUuid)
  @Post('subscribe')
  public async subscribeToCourse(
    @Body() data: SubscriberCourseDTO
  ): Promise<Course> {
    const result = await this.courseService.subscriberCourse(data)
    return result
  }

  @AuthDeclaration('jwt')
  @UseGuards(MatchUuid)
  @Post('unsubscribe')
  public async unSubscribeToCourse(
    @Body() data: SubscriberCourseDTO
  ): Promise<Course> {
    const result = await this.courseService.unSubscribeCourse(data)
    return result
  }
}
