import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserLogic } from './user.logic';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './herlpers/email.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [UserService, UserLogic, JwtService, EmailService],
  controllers: [UserController],
})
export class UserModule {}