import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SuperheroesService {
  private superheroes = [];

  constructor() {
    this.loadSuperheroes(); // ✅ Properly invoke the method
  }

  private loadSuperheroes() {
    try {
      const filePath = path.join(
        __dirname,
        '../../src/seed/superheroes.seed.json',
      );
      const data = fs.readFileSync(filePath, 'utf-8'); // ✅ Use filePath
      this.superheroes = JSON.parse(data);
    } catch (error) {
      console.error('Error loading superheroes:', error);
      this.superheroes = []; // Handle error gracefully
    }
  }

  findAll() {
    return this.superheroes;
  }
}
