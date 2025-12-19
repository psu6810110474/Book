import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBookCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
