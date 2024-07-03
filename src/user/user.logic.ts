import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/User.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user';
import { CreateUserDto } from './dto/create-user';
import { EmailUserDto } from './dto/email-user';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
require("dotenv").config();

@Injectable()
export class UserLogic {
  private transporter: nodemailer.Transporter;
  private baseUrl: string;
  private frontendBaseUrl: string;

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    this.baseUrl = process.env.BASE_URL
    this.frontendBaseUrl = process.env.BASE_URL_FRONTEND
  }

  async enviarCorreo(destinatario: string, asunto: string, cuerpo: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: asunto,
      text: cuerpo,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.messageId);
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
      access_token: accessToken
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

    if (newUser.secondaryEmail) {
      await this.sendRegistrationEmail(newUser.secondaryEmail, newUser.name);
    }

    return newUser;
  }

  private async sendApproveEmail(newUser: User, recipients: string[]) {
    const approveLink = `${this.baseUrl}/User/approve/${encodeURIComponent(newUser.id)}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipients.join(','),
        subject: 'SOLICITUD DE REGISTRO',
        html: `
            <p>Hola,</p>
            <p>Datos de registro nuevo:</p>
            <ul>
                <li><strong>Nombre:</strong> ${newUser.name}</li>
                <li><strong>Apellido:</strong> ${newUser.lastName}</li>
                <li><strong>Identificación:</strong> ${newUser.identification}</li>
                <li><strong>Tipo de Documento:</strong> ${newUser.typeDocument}</li>
                <li><strong>Teléfono:</strong> ${newUser.phone}</li>
                <li><strong>Email Corporativo:</strong> ${newUser.corporateEmail}</li>
                <li><strong>Email Secundario:</strong> ${newUser.secondaryEmail}</li>
                <li><strong>Empresa:</strong> ${newUser.company}</li>
                <li><strong>Fecha de Nacimiento:</strong> ${newUser.birthdayDate}</li>
                <li><strong>Teléfono Personal:</strong> ${newUser.personalPhone}</li>
                <li><strong>Rol:</strong> ${newUser.role}</li>
            </ul>
            <p>Para aprobar la solicitud presione el botón.</p>
            <p><a href="${approveLink}" target="_blank" style="
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #FFFFFF;
                background-color: #F50002;
                text-decoration: none;
                border-radius: 5px;
            ">Aprobar solicitud</a></p>
        `,
    };
  
    try {
        await this.transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
  }

  private async sendRegistrationEmail(secondaryEmail: string, name: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: secondaryEmail,
      subject: 'SOLICITUD DE REGISTRO',
      text: `Hola ${name},\n\nHemos recibido tu registro, en pronto nos comunicaremos contigo.\n`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
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

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.secondaryEmail,
        subject: 'Registro Aprobado',
        html: `
            <p>Hola ${user.name},</p>
            <p>Tu solicitud de registro ha sido aprobada.</p>
            <p>Bienvenido a nuestra plataforma.</p>
        `,
    };

    try {
        await this.transporter.sendMail(mailOptions);
        console.log('Correo electrónico de confirmación de aprobación enviado');
    } catch (error) {
        console.error('Error al enviar el correo electrónico de confirmación de aprobación:', error);
    }
  }

  async emailPassword(emailUserDto: EmailUserDto) { 
    const email = await this.usersService.findOneByEmail(emailUserDto.secondaryEmail);
    if (!email) {
      throw new Error('Usuario no encontrado');
    }

    await this.sendRecoverPasswordMail(email.secondaryEmail, email.name, email.id);
    return email;
  }


  private async sendRecoverPasswordMail(secondaryEmail: string, name: string, id: number) {
    const resetPasswordLink = `${this.frontendBaseUrl}/reset-password?userId=${encodeURIComponent(id)}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: secondaryEmail,
      subject: 'Recuperación de Contraseña',
      html: `
        <p>Hola, ${name}</p>
        <p>Por favor presiona el botón para cambiar tu contraseña</p>
        <p><a href="${resetPasswordLink}" target="_blank" style="
            display: inline-block;
            padding: 10px 20px;
            font-size: 13px;
            color: #FFFFFF;
            background-color: #F50002;
            text-decoration: none;
            border-radius: 5px;
        ">RESTAURAR CONTRASEÑA</a></p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado para recuperación de contraseña');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }


  async recoverPassword(id: number, password: string): Promise<{ message: string }> {
    try {
      const user = await this.usersService.findOneById(id);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await this.usersService.saveUser(user);

      return { message: 'Contraseña actualizada exitosamente' };
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      throw new Error('No se pudo restablecer la contraseña');
    }
  }

}
