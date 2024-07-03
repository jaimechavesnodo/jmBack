import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { CreateUserDto } from './dto/create-user';


@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.UserRepository.find();
    } 

    findOne( id: number ): Promise<User> {
        return this.UserRepository.findOneBy({ id });
    }

    async findOneByIdentification(identification: string): Promise<User | undefined> {
        return this.UserRepository.findOne({ where: { identification } });
    }

    findOneById( id: number ): Promise<User | undefined> {
        return this.UserRepository.findOne({ where:{ id } });
    }
    
    async deleteUser(id: number): Promise<void> {
        await this.UserRepository.delete(id);
    }

    async createUser (createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.UserRepository.create(createUserDto);
        return this.UserRepository.save(newUser);
    }

    async findOneByEmail (secondaryEmail: string): Promise<User> {
        return this.UserRepository.findOne({ where: { secondaryEmail } });
    }

    async saveUser (user: User): Promise<User> {
        return await this.UserRepository.save(user);
    }
}