import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    create(email: string, password: string) {
        const user = this.usersRepository.create({ email, password });//run validations
        return this.usersRepository.save(user);// save to db , hooks will not run if we use save without create
    };

    findOne(id: number) {
        return this.usersRepository.findOneBy({ id });
    };
    find(email: string) {
        return this.usersRepository.findBy({ email });

    };

    async update(id: number, attrs: Partial<User>) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new Error('user not found');
        }
        Object.assign(user, attrs);
        return this.usersRepository.save(user);

    }
    async remove(id: number) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new Error('user not found');
        }
        return this.usersRepository.remove(user);
    }
}