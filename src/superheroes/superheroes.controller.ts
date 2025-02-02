import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesDto } from '../dtos/Superheroes.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private superheroesService: SuperheroesService) {}

  @Get()
  async findAll() {
    const filePath = path.join(
      __dirname,
      '../../src/seed/superheroes.seed.json',
    );
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading superheroes file:', error);
      return [];
    }
  }

  @Post()
  async create(@Body() createSuperheroDto: SuperheroesDto) {
    const filePath = path.join(
      __dirname,
      '../../src/seed/superheroes.seed.json',
    );

    try {
      let currentData: SuperheroesDto[] = [];

      try {
        const data = await fs.readFile(filePath, 'utf-8');
        currentData = JSON.parse(data);
      } catch (readError) {
        console.warn(
          'Superheroes file does not exist or is empty. Creating a new one.',
        );
      }

      currentData.push(createSuperheroDto);
      await fs.writeFile(filePath, JSON.stringify(currentData, null, 2));

      console.log('Superhero added successfully:', createSuperheroDto);
      return {
        message: 'Superhero added successfully',
        superhero: createSuperheroDto,
      };
    } catch (error) {
      console.error('Error writing to superheroes file:', error);
      throw error;
    }
  }
}
