// PLANTILLA DE MIDDLEWARE
// Esta es una plantilla de ejemplo para crear middlewares

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Aquí va la lógica del middleware
    // Ejemplo: logging, validaciones, modificación de request
    
    console.log(`Request to: ${req.url}`);
    
    next();
  }
}

