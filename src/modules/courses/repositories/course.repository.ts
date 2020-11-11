import { Course } from '../entities/course.entity'
import { EntityRepository, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  public async createAndSave<T>(data: T): Promise<Course> {
    const newData = this.create(data)

    await this.save(data)

    return newData
  }
}
