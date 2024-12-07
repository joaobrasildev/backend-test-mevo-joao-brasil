import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AbstractGetResumeUseCase } from '../use-cases/abstract-get-resume.use-case';
import { plainToClass } from 'class-transformer';
import { GetResumeResponseDto } from '@src/shared/dtos/get-resume-response.dto';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';


class Resume {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  resume: Object;
}

@Controller('resumes')
@ApiTags('Operation')
export class GetResumeController {
    constructor(
        private readonly getResumeUseCase: AbstractGetResumeUseCase
    ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    description: 'Response resume',
    type: Resume,

})
  async execute(@UploadedFile() file: any): Promise<GetResumeResponseDto> {
    const buffer = file.buffer;
    try {
      const data = this.getResumeUseCase.execute(buffer);
      return plainToClass(GetResumeResponseDto, data)
    } catch (error) {
      return error;
    }
  }
}
