import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import * as fs from 'fs/promises';
import * as path from 'path';

jest.mock('fs/promises');

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let mockSuperheroesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        { provide: SuperheroesService, useValue: mockSuperheroesService },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of superheroes', async () => {
    const mockData = JSON.stringify([
      { id: 1, name: 'Superman', power: 'Flight' },
      { id: 2, name: 'Batman', power: 'Martial Arts' },
    ]);

    (fs.readFile as jest.Mock).mockResolvedValue(mockData);

    const result = await controller.findAll();

    expect(result).toEqual(JSON.parse(mockData));
    expect(fs.readFile).toHaveBeenCalledWith(
      path.join(__dirname, '../../src/seed/superheroes.seed.json'),
      'utf-8',
    );
  });

  it('should return an empty array if file read fails', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

    const result = await controller.findAll();

    expect(result).toEqual([]);
  });
});
