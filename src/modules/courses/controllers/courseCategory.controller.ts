import { Controller } from '@nestjs/common'
import { CourseCategory } from '../entities/courseCategory.entity'

@Controller('courseCategory')
export class CourseController {
  public async createCategory(): Promise<any> {}
}
