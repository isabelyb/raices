// Importamos las herramientas de NestJS para hacer tests
import { Test, TestingModule } from '@nestjs/testing';
// Importamos el servicio que vamos a probar
import { UsersService } from './users.service';
// Importamos el repositorio que necesita UsersService
import { UsersRepository } from './users.repository';
// Importamos herramientas de TypeORM para mockear repositorios
import { getRepositoryToken } from '@nestjs/typeorm';
// Importamos la entidad Legends que necesita UsersService
import { Legends } from '../entities/legends.entity';

// Agrupamos todos los tests de UsersService
describe('UsersService', () => {
  // Variables para guardar el servicio y el repositorio
  let usersService: UsersService;
  let usersRepository: any;

  // Esto se ejecuta ANTES de cada test para preparar todo
  beforeEach(async () => {
    // Creamos un módulo de prueba (sin base de datos real)
    const testingModule = await Test.createTestingModule({
      providers: [
        // Le decimos que vamos a probar UsersService
        UsersService,
        {
          // Reemplazamos UsersRepository por una función falsa (mock)
          provide: UsersRepository,
          useValue: {
            // jest.fn() crea una función falsa que podemos controlar
            findUserByUuid: jest.fn(),
          },
        },
        {
          // Reemplazamos el repositorio de Legends por un objeto vacío (mock)
          provide: getRepositoryToken(Legends),
          useValue: {},
        },
      ],
    }).compile();

    // Obtenemos el servicio y el repositorio del módulo de prueba
    usersService = testingModule.get<UsersService>(UsersService);
    usersRepository = testingModule.get(UsersRepository);
  });

  // Test: "debe devolver usuario cuando se llama findOne con uuid"
  it('should return user when findOne is called with uuid', async () => {
    // Creamos un usuario de ejemplo
    const mockUser = {
      uuid: '123',
      name: 'Test User',
      email: 'test@test.com'
    };
    // Simulamos que findUserByUuid devuelve ese usuario
    usersRepository.findUserByUuid.mockResolvedValue(mockUser);

    // UUID de ejemplo para buscar
    const userUuid = '123';
    // Llamamos al método findOne con ese UUID
    const result = await usersService.findOne(userUuid);

    // Verificamos que el resultado sea igual al usuario que esperamos
    expect(result).toEqual(mockUser);
    // Verificamos que se llamó al método findUserByUuid con el UUID correcto
    expect(usersRepository.findUserByUuid).toHaveBeenCalledWith(userUuid);
  });
});

