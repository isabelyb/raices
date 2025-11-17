import {
  // ConflictException,
  Injectable,
  // NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { UsersRepository } from 'src/users/users.repository';
// import { CredentialsRepository } from 'src/credentials/credentials.repository';
import { SignUpDto } from './Dtos/signUp.dto';
import { SignInDto } from './Dtos/signIn.dto';
// import { Role } from 'src/enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    // TODO: Descomentar cuando repositories estén listos (Personas 1 y 2)
    // private readonly usersRepository: UsersRepository,
    // private readonly credentialsRepository: CredentialsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    // TODO: Descomentar cuando repositories estén listos
    /*
    const emailExists = await this.usersRepository.getUserByEmail(signUpDto.email);
    if (emailExists) {
      throw new ConflictException('El email ya está registrado');
    }

    const usernameExists = await this.credentialsRepository.getUserByUsername(signUpDto.username);
    if (usernameExists) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const newUser = await this.usersRepository.createUser({
      name: signUpDto.name,
      email: signUpDto.email,
      Phone: signUpDto.phone || '',
      Location: signUpDto.location,
      isActive: true,
      createdAt: new Date(),
    });

    await this.credentialsRepository.createCredentials({
      userName: signUpDto.username,
      password: hashedPassword,
      role: Role.USER,
      isActive: true,
      user: newUser,
    });

    return {
      message: 'Usuario registrado exitosamente',
      user: {
        uuid: newUser.uuid,
        name: newUser.name,
        email: newUser.email,
        username: signUpDto.username,
      },
    };
    */

    return {
      message: 'Módulo Auth listo - Esperando UsersRepository y CredentialsRepository',
      note: 'Este endpoint estará funcional cuando Personas 1 y 2 completen sus módulos',
    };
  }

  async signIn(signInDto: SignInDto) {
    // TODO: Descomentar cuando repositories estén listos
    /*
    const credential = await this.credentialsRepository.getUserByUsername(signInDto.username);

    if (!credential) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!credential.isActive) {
      throw new UnauthorizedException('Usuario inactivo. Contacta al administrador');
    }

    const isPasswordValid = await bcrypt.compare(signInDto.password, credential.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: credential.user.uuid,
      username: credential.userName,
      role: credential.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        uuid: credential.user.uuid,
        name: credential.user.name,
        email: credential.user.email,
        username: credential.userName,
        role: credential.role,
      },
    };
    */

    return {
      message: 'Módulo Auth listo - Esperando UsersRepository y CredentialsRepository',
      note: 'Este endpoint estará funcional cuando Personas 1 y 2 completen sus módulos',
    };
  }

  async getProfile(userId: string) {
    // TODO: Descomentar cuando UsersRepository esté listo
    /*
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      phone: user.Phone,
      location: user.Location,
      username: user.credential.userName,
      role: user.credential.role,
      favorites: user.favorites || [],
      createdAt: user.createdAt,
    };
    */

    return {
      message: 'Módulo Auth listo - Esperando UsersRepository',
      userId: userId,
      note: 'Este endpoint estará funcional cuando Persona 1 complete el módulo Users',
    };
  }
}

