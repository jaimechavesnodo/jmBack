import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user';
import { CreateUserDto } from './dto/create-user';
import { EmailUserDto } from './dto/email-user';
import * as bcrypt from 'bcrypt';
import { getApproveEmailTemplate, getRecoverPasswordEmailTemplate, getApprovalConfirmationEmailTemplate, getSendPasswordConfirmationEmail, getSendDeclineUserEmail, getSendRegistrationUser } from './herlpers/user.templates';
import { MailerService } from './herlpers/mail.services';

@Injectable()
export class UserLogic {
  private baseUrl: string;
  private frontendBaseUrl: string;

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    this.baseUrl = process.env.BASE_URL;
    this.frontendBaseUrl = process.env.BASE_URL_FRONTEND;
  }

  async enviarCorreo(destinatario: string, asunto: string, cuerpo: string) {
    try {
      await this.mailerService.sendMail(destinatario, asunto, cuerpo);
      console.log('Correo enviado');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('Error al enviar el correo electrónico');
    }
  }

  async validateUser(identification: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByIdentification(identification);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { identification, password } = loginDto;
    const user = await this.validateUser(identification, password);
    if (!user) {
      throw new UnauthorizedException('Invalid identification or password');
    }
    const payload = { identification: user.identification, sub: user.id };
    const secretKey = process.env.JWT_SECRET_KEY;
    const accessToken = this.jwtService.sign(payload, { secret: secretKey });

    return {
      access_token: accessToken,
      idUser: user.id,
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...otherDetails } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userWithHashedPassword = {
      ...otherDetails,
      password: hashedPassword,
    };

    const newUser = await this.usersService.createUser(userWithHashedPassword);

    const approveEmailRecipients = process.env.APPROVE_EMAIL_RECIPIENTS.split(',');
    await this.sendApproveEmail(newUser, approveEmailRecipients);

    if (newUser.corporateEmail) {
      await this.sendRegistrationEmail(newUser.corporateEmail);
    }

    return newUser;
  }

  private async sendApproveEmail(newUser: User, recipients: string[]) {
    const htmlContent = getApproveEmailTemplate(newUser, this.baseUrl);

    try {
      await this.mailerService.sendMail(
        recipients.join(','),
        'Nueva Activación de usuario',
        htmlContent
      );
      console.log('Correo electrónico enviado');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }

  private async sendRegistrationEmail(corporateEmail: string) {
    const textContent = getSendRegistrationUser();

    try {
      await this.mailerService.sendMail(
        corporateEmail,
        'Bienvenido, ya eres parte del Plan Privilegios.',
        textContent
      );
      console.log('Correo electrónico de confirmación enviado');
    } catch (error) {
      console.error('Error al enviar el correo electrónico de confirmación:', error);
    }
  }

  async approveUser(id: number): Promise<void> {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    user.idStatus = 1;
    await this.usersService.saveUser(user);

    await this.sendApprovalConfirmationEmail(user);
  }

  private async sendApprovalConfirmationEmail(user: User) {
    const htmlContent = getApprovalConfirmationEmailTemplate(user);

    try {
      await this.mailerService.sendMail(
        user.corporateEmail,
        'Bienvenido, ya eres parte del Plan Privilegios.',
        htmlContent
      );
      console.log('Correo electrónico de confirmación de aprobación enviado');
    } catch (error) {
      console.error('Error al enviar el correo electrónico de confirmación de aprobación:', error);
    }
  }

  async declineUser(id: number): Promise<void> {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    user.idStatus = 3;
    await this.usersService.saveUser(user);

    await this.sendDeclineEmail(user);
  }

  private async sendDeclineEmail(user: User) {
    const htmlContent = getSendDeclineUserEmail(user);

    try {
      await this.mailerService.sendMail(
        user.corporateEmail,
        'Lo sentimos, pero tenemos una oportunidad más.',
        htmlContent
      );
      console.log('Correo electrónico de rechazo enviado');
    } catch (error) {
      console.error('Error al enviar el correo electrónico de rechazo:', error);
    }
  }

  async emailPassword(emailUserDto: EmailUserDto) {
    const email = await this.usersService.findOneByEmail(emailUserDto.corporateEmail);
    if (!email) {
      throw new Error('Correo de usuario no encontrado');
    }

    await this.sendRecoverPasswordMail(email.corporateEmail, email.name, email.id);
    return email;
  }

  private async sendRecoverPasswordMail(corporateEmail: string, name: string, id: number) {
    const htmlContent = getRecoverPasswordEmailTemplate(name, id, this.frontendBaseUrl);

    try {
      await this.mailerService.sendMail(
        corporateEmail,
        'Cambio de Contraseña',
        htmlContent
      );
      console.log('Correo electrónico enviado para recuperación de contraseña');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }

  async recoverPassword(id: number, password: string): Promise<{ message: string, idUser: number }> {
    try {
      const user = await this.usersService.findOneById(id);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await this.usersService.saveUser(user);

      await this.sendPasswordConfirmationEmail(user);

      return {
        message: 'Contraseña actualizada exitosamente',
        idUser: user.id,
      };
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      throw new Error('No se pudo restablecer la contraseña');
    }
  }

  private async sendPasswordConfirmationEmail(user: User) {
    const htmlContent = getSendPasswordConfirmationEmail(user);

    try {
      await this.mailerService.sendMail(
        user.corporateEmail,
        'Cambio de Contraseña Exitoso',
        htmlContent
      );
      console.log('Correo electrónico de confirmación de cambio de contraseña enviado');
    } catch (error) {
      console.error('No se pudo enviar el correo electrónico de confirmación', error);
    }
  }
}

