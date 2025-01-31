import { IsNotEmpty, MinLength, IsString, IsNumber } from 'class-validator';

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

  @IsNumber()
  humilityScore: number;
}
