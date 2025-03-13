import { IsEmail, IsEnum, IsNumber, IsPositive, IsString, IsOptional } from "class-validator";

export enum Role {
  REGULAR = "REGULAR",
  ADMIN = "ADMIN"
}

// DTO para el registro de un usuario (normal)
export class RegisterUserDto {
  @IsString()
  name: string;
  
  @IsEmail()
  email: string;
  
  @IsString()
  password: string;
}

// DTO para que el usuario actualice sus propios datos.
// Se usará el id obtenido del token (por ello, no se envía en el body).
export class UpdateSelfUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}

// DTO para que el admin cree un usuario
export class CreateUserDto {
  @IsString()
  name: string;
  
  @IsEmail()
  email: string;
  
  @IsString()
  password: string;
  
  @IsOptional()
  @IsEnum(Role)
  role: Role;
}

// DTO para que el admin actualice un usuario (debe enviar el id)
export class UpdateUserDto {
  @IsNumber()
  @IsPositive()
  id: number;
  
  @IsOptional()
  @IsString()
  name: string;
  
  @IsOptional()
  @IsEmail()
  email: string;
  
  @IsOptional()
  @IsString()
  password: string;
  
  @IsOptional()
  @IsEnum(Role)
  role: Role;
}

// DTO para que el admin consulte o elimine un usuario por id
export class GetUserDto {
  @IsNumber()
  @IsPositive()
  id: number;
}
