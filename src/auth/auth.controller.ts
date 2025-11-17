import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './Dtos/signUp.dto';
import { SignInDto } from './Dtos/signIn.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './Guards/auth.guard';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description:
      'Crea un nuevo usuario en el sistema con sus credenciales de acceso. El usuario se crea con rol USER por defecto.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    example: {
      message: 'Usuario registrado exitosamente',
      user: {
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        name: 'María Rodríguez',
        email: 'maria.rodriguez@example.com',
        username: 'maria.rodriguez',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Email o username ya registrado',
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Autentica un usuario con username y password. Devuelve un token JWT que debe usarse en las peticiones protegidas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso. Devuelve token JWT',
    example: {
      message: 'Inicio de sesión exitoso',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      user: {
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        name: 'María Rodríguez',
        email: 'maria.rodriguez@example.com',
        username: 'maria.rodriguez',
        role: 'user',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas o usuario inactivo',
  })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Obtener perfil del usuario autenticado',
    description:
      'Devuelve los datos del perfil del usuario autenticado. Requiere token JWT válido en el header Authorization.',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario',
  })
  @ApiResponse({
    status: 401,
    description: 'Token no válido o expirado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  async getProfile(@Req() request: any) {
    const userId = request.user.sub;
    return await this.authService.getProfile(userId);
  }
}

