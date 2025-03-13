import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  userId: number;
}

export class UpdateNoteDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNumber()
  userId: number;
}

export class GetNoteDto {
  @IsNumber()
  id: number;
}
