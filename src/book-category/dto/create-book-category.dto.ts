import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBookCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
