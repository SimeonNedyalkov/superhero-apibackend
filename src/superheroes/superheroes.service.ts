import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SuperheroesService {
  private superheroes = [];

  constructor() {
    this.loadSuperheroes();
  }

  private loadSuperheroes() {
    try {
      const filePath = path.join(
        __dirname,
        '../../src/seed/superheroes.seed.json',
      );
      const data = fs.readFileSync(filePath, 'utf-8');
      this.superheroes = JSON.parse(data);
    } catch (error) {
      console.error('Error loading superheroes:', error);
      this.superheroes = [];
    }
  }

  findAll() {
    return this.superheroes;
  }
}
