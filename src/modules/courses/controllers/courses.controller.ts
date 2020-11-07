import {
  Body,
  ClassSerializerInterceptor,
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
import { diskStorage } from 'multer'
import {
  editFileName,
  imageFileFilter,
} from 'src/shared/utils/fileFormatet.utils'
import { CreateCourseDTO } from '../dtos/createCourse.dto'
import { Course } from '../entities/course.entity'
import { JWtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { RoleGuard } from 'src/modules/auth/guards/role-auth.guard'
import { UpdateCourseDTO } from '../dtos/updateCourse.dto'
import { Lesson } from 'src/modules/lessons/entities/lesson.entity'

@Controller('courses')
@UseGuards(JWtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Post()
  @UseGuards(RoleGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './temp/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async createCourse(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateCourseDTO
  ): Promise<Course> {
    const newCourse = await this.courseService.createCourse(data, file.filename)

    return newCourse
  }

  @UseGuards(RoleGuard)
  @Post('update')
  public async updateCourse(@Body() data: UpdateCourseDTO): Promise<Course> {
    const updatedCourse = await this.courseService.updateCourse(data)

    return updatedCourse
  }

  @Get()
  public async getAllCourses(): Promise<Course[]> {
    const courses = await this.courseService.getAllCourses()

    return courses
  }

  @Get(':id/lessons')
  public async getAllLessonsByCourseId(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<Lesson[]> {
    const lessons = await this.courseService.getAllLessonsByCourseId(id)

    return lessons
  }
}
