import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserLogic} from './user.logic';
import { UserController} from './user.controller';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),],
    providers: [UserService,UserLogic, JwtService],
    controllers: [UserController],
  })
  export class UserModule {}
