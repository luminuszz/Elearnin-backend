import { Controller, Get, Param, Res } from '@nestjs/common'
import { join } from 'path'
import { AppService } from './app.service'
import { Response } from 'express'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('images/:id')
  public getFiles(
    @Param('id') filename: string,
    @Res() response: Response
  ): void {
    const path = join(__dirname, '..', 'temp', 'images', filename)

    return response.sendFile(path)
  }
}
