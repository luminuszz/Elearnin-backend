import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateLessonDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  duration: number

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  videoId: string

  @IsUUID()
  @IsNotEmpty()
  courseId: string
}
