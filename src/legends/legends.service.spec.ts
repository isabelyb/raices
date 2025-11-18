// Importamos las herramientas de NestJS para hacer tests
import { Test, TestingModule } from '@nestjs/testing';
// Importamos el servicio que vamos a probar
import { LegendsService } from './legends.service';
// Importamos el repositorio que necesita LegendsService
import { LegendsRepository } from './legends.repository';

// Agrupamos todos los tests de LegendsService
describe('LegendsService', () => {
  // Variables para guardar el servicio y el repositorio
  let legendsService: LegendsService;
  let legendsRepository: any;

  // Esto se ejecuta ANTES de cada test para preparar todo
  beforeEach(async () => {
    // Creamos un módulo de prueba (sin base de datos real)
    const testingModule = await Test.createTestingModule({
      providers: [
        // Le decimos que vamos a probar LegendsService
        LegendsService,
        {
          // Reemplazamos LegendsRepository por una función falsa (mock)
          provide: LegendsRepository,
          useValue: {
            // jest.fn() crea una función falsa que podemos controlar
            getAllLegendsRepository: jest.fn(),
          },
        },
      ],
    }).compile();

    // Obtenemos el servicio y el repositorio del módulo de prueba
    legendsService = testingModule.get<LegendsService>(LegendsService);
    legendsRepository = testingModule.get(LegendsRepository);
  });

  // Test: "debe devolver array de leyendas cuando se llama getAllLegendsService"
  it('should return array of legends when getAllLegendsService is called', async () => {
    // Creamos un array de leyendas de ejemplo
    const mockLegendsArray = [
      { uuid: '1', title: 'Test Legend' }
    ];
    // Simulamos que getAllLegendsRepository devuelve ese array
    legendsRepository.getAllLegendsRepository.mockResolvedValue(mockLegendsArray);

    // Llamamos al método que obtiene todas las leyendas
    const result = await legendsService.getAllLegendsService();

    // Verificamos que el resultado sea un array
    expect(Array.isArray(result)).toBe(true);
    // Verificamos que el resultado sea igual al array que esperamos
    expect(result).toEqual(mockLegendsArray);
  });
});

