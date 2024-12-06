import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AbstractGetResumeUseCase } from '../use-cases/abstract-get-resume.use-case';
import { Express } from 'express';
import { plainToClass } from 'class-transformer';
import { GetResumeResponseDto } from '@src/shared/dtos/get-resume-response.dto';
import { ApiResponseProperty, ApiTags } from '@nestjs/swagger';

@Controller('resumes')
@ApiTags('Operation')
export class GetResumeController {
    constructor(
        private readonly getResumeUseCase: AbstractGetResumeUseCase
    ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponseProperty({
    type: GetResumeResponseDto
})
  async execute(@UploadedFile() file: Express.Multer.File): Promise<GetResumeResponseDto> {
    const buffer = file.buffer;
    try {
      const data = this.getResumeUseCase.execute(buffer);
      return plainToClass(GetResumeResponseDto, data)
    } catch (error) {
      return error;
    }
  }
}
