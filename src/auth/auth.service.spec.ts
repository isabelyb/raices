// Importamos las herramientas de NestJS para hacer tests
import { Test, TestingModule } from '@nestjs/testing';
// Importamos JwtService que se usa para generar tokens
import { JwtService } from '@nestjs/jwt';
// Importamos el servicio que vamos a probar
import { AuthService } from './auth.service';
// Importamos los repositorios que necesita AuthService
import { UsersRepository } from '../users/users.repository';
import { CredentialsRepository } from '../credentials/credentials.repository';
// Importamos bcrypt para hashear contraseñas
import * as bcrypt from 'bcrypt';

// Reemplazamos bcrypt por una versión falsa (mock) para no usar la real en tests
jest.mock('bcrypt');

// Agrupamos todos los tests de AuthService
describe('AuthService', () => {
  // Variables para guardar el servicio y sus dependencias
  let authService: AuthService;
  let usersRepository: any;
  let credentialsRepository: any;
  let jwtService: any;

  // Esto se ejecuta ANTES de cada test para preparar todo
  beforeEach(async () => {
    // Creamos un módulo de prueba (sin base de datos real)
    const testingModule = await Test.createTestingModule({
      providers: [
        // Le decimos que vamos a probar AuthService
        AuthService,
        {
          // Reemplazamos UsersRepository por funciones falsas (mocks)
          provide: UsersRepository,
          useValue: {
            // jest.fn() crea una función falsa que podemos controlar
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          // Reemplazamos CredentialsRepository por funciones falsas
          provide: CredentialsRepository,
          useValue: {
            getUserByUsername: jest.fn(),
            createCredentials: jest.fn(),
          },
        },
        {
          // Reemplazamos JwtService por una función falsa
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    // Obtenemos el servicio y los repositorios del módulo de prueba
    authService = testingModule.get<AuthService>(AuthService);
    usersRepository = testingModule.get(UsersRepository);
    credentialsRepository = testingModule.get(CredentialsRepository);
    jwtService = testingModule.get(JwtService);
  });

  // Test: "debe crear usuario cuando se llama signup"
  it('should create user when signup is called', async () => {
    // Simulamos que no existe un usuario con ese email (devuelve null)
    usersRepository.getUserByEmail.mockResolvedValue(null);
    // Simulamos que no existe ese username (devuelve null)
    credentialsRepository.getUserByUsername.mockResolvedValue(null);
    // Creamos un objeto de usuario de ejemplo
    const newUser = { uuid: '123', name: 'Test User', email: 'test@test.com' };
    // Simulamos que createUser devuelve ese usuario
    usersRepository.createUser.mockResolvedValue(newUser);
    // Simulamos que createCredentials devuelve un objeto vacío
    credentialsRepository.createCredentials.mockResolvedValue({});

    // Datos de ejemplo para registrarse
    const signUpData = {
      name: 'Test User',
      email: 'test@test.com',
      username: 'testuser',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      location: 'Bogota',
    };

    // Llamamos al método signUp con esos datos
    const result = await authService.signUp(signUpData);

    // Verificamos que el resultado tenga la propiedad 'message'
    expect(result).toHaveProperty('message');
    // Verificamos que se llamó al método createUser
    expect(usersRepository.createUser).toHaveBeenCalled();
  });

  // Test: "debe devolver token JWT cuando se llama signin"
  it('should return JWT token when signin is called', async () => {
    // Creamos credenciales de ejemplo
    const mockCredential = {
      username: 'testuser',
      password: 'hashedpassword',
      isActive: true,
      user: { uuid: '123', name: 'Test User', email: 'test@test.com' },
      role: 'user',
    };
    // Simulamos que getUserByUsername devuelve esas credenciales
    credentialsRepository.getUserByUsername.mockResolvedValue(mockCredential);
    // Simulamos que bcrypt.compare devuelve true (contraseña correcta)
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    // Simulamos que JWT devuelve este token
    jwtService.sign.mockReturnValue('testtoken123');

    // Datos de ejemplo para iniciar sesión
    const signInData = {
      username: 'testuser',
      password: 'Password123!',
    };

    // Llamamos al método signIn con esos datos
    const result = await authService.signIn(signInData);

    // Verificamos que el resultado tenga la propiedad 'token'
    expect(result).toHaveProperty('token');
    // Verificamos que el token sea el que esperamos
    expect(result.token).toBe('testtoken123');
  });
});

