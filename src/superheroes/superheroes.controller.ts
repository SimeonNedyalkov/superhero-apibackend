import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesDto } from 'src/dtos/Superheroes.dto';
import * as fs from 'fs';
import * as path from 'path';

interface Superhero {
  superhero: string;
  superpower: string;
  humilityScore: number;
}

@Controller('superheroes')
export class SuperheroesController {
  constructor(private superheroesService: SuperheroesService) {}

  @Get()
  findAll() {
    return this.superheroesService.findAll();
  }
  @Post()
  async create(@Body() createSuperheroDto: SuperheroesDto) {
    const filePath = path.join(
      __dirname,
      '../../src/seed/superheroes.seed.json',
    );
    try {
      let currentData: SuperheroesDto[] = [];
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        currentData = JSON.parse(data);
      }
      currentData.push(createSuperheroDto);
      console.log(currentData);
      fs.writeFileSync(filePath, JSON.stringify(currentData));

      console.log('File written successfully');
      return {
        message: 'Superhero added successfully',
        superhero: createSuperheroDto,
      };
    } catch (error) {}

    return createSuperheroDto;
  }
}
