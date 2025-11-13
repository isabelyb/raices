// PLANTILLA DE DECORATOR
// Esta es una plantilla de ejemplo para crear decoradores personalizados

import { SetMetadata } from '@nestjs/common';

// Ejemplo de uso: @Roles('admin', 'user')
export const ExampleDecorator = (...args: string[]) =>
  SetMetadata('example-key', args);

