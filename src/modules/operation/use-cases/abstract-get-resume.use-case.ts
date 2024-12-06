import { IGetResumeResponse } from "@src/shared/interfaces/get-resume.interface";

export abstract class AbstractGetResumeUseCase {
    abstract execute(csv: Buffer): Promise<IGetResumeResponse>;
}