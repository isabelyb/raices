// PLANTILLA DE GUARD
// Esta es una plantilla de ejemplo para crear guards de protección de rutas

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ExampleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Aquí va la lógica de validación
    // Retornar true para permitir el acceso, false para denegarlo
    
    return true;
  }
}

