// Importamos las herramientas de NestJS para hacer tests
import { Test, TestingModule } from '@nestjs/testing';
// Importamos el controller y service que vamos a probar
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Agrupamos todos los tests de AppController
describe('AppController', () => {
  // Variable para guardar el controller que vamos a probar
  let appController: AppController;

  // Esto se ejecuta ANTES de cada test para preparar todo
  beforeEach(async () => {
    // Creamos un módulo de prueba (sin base de datos real)
    const testingModule = await Test.createTestingModule({
      // Le decimos qué controller vamos a probar
      controllers: [AppController],
      // Le decimos qué service necesita el controller
      providers: [AppService],
    }).compile();

    // Obtenemos el controller del módulo de prueba
    appController = testingModule.get<AppController>(AppController);
  });

  // Este es el test: "debe devolver HTML con el nombre del proyecto"
  it('should return HTML with project name', () => {
    // Llamamos al método getHello() del controller
    const result = appController.getHello();
    // Verificamos que el resultado contenga el texto "Raíces Ancestrales"
    expect(result).toContain('Raíces Ancestrales');
  });
});
