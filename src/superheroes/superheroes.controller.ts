import { Controller, Get } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private superheroesService: SuperheroesService) {}

  @Get()
  findAll() {
    return this.superheroesService.findAll();
  }
}
