import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserLogic } from './user.logic';
import { LoginDto } from './dto/login-user';
import { CreateUserDto } from './dto/create-user';
import { EmailUserDto } from './dto/email-user';
import { RecoverPasswordDto } from './dto/recover-password'


@Controller('User')
export class UserController {
  constructor(private readonly userLogic: UserLogic) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
    return this.userLogic.login(loginDto);
    }

    @Post('createUser')
    createUser(@Body() createUserDto: CreateUserDto) {
      const newUser = this.userLogic.createUser(createUserDto);
      return newUser;
    }

    @Get('approveEmail/:id')
    async approveUser(@Param('id') id: number): Promise<void> {
    await this.userLogic.approveUser(id);
    }

    @Post('emailRecoverPassword')
    async gmailPassword(@Body() emailUserDto: EmailUserDto) {
    return this.userLogic.emailPassword(emailUserDto);
    }

    @Post('recoverPassword/:id')
    async recoverPassword(@Param('id') id: number, @Body() recoverPasswordDto: RecoverPasswordDto) {
    return this.userLogic.recoverPassword(id, recoverPasswordDto.password);
    }

} 