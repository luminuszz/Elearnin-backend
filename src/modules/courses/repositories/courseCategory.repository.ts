import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { CourseCategory } from '../entities/courseCategory.entity'

@Injectable()
@EntityRepository(CourseCategory)
export class CourseCategoryRepository extends Repository<CourseCategory> {
  public async createAndSave<T>(data: T): Promise<CourseCategory> {
    const instance = this.create(data)

    await this.save(instance)

    return instance
  }
}
