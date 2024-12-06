import { ApiProperty } from "@nestjs/swagger";
import { IGetResumeResponse } from "../interfaces/get-resume.interface";

export class GetResumeResponseDto {
    @ApiProperty()
    amount: string

    @ApiProperty()
    resume: IGetResumeResponse
}