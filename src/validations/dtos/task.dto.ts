import { IsString, IsOptional, IsNumber, IsDateString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsNumber()
  userId: number;
}

export class UpdateTaskDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsNumber()
  userId: number;
}

export class GetTaskDto {
  @IsNumber()
  id: number;
}
