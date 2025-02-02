import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class SuperheroesDto {
  superhero: string;
  superpower: string;
  humilityScore: number;
}

export class SuperheroData {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  superhero: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  superpower: string;

  @Min(1)
  @Max(10)
  @IsNumber()
  humilityScore: number;
}
