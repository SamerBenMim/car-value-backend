import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signup(email: string, password: string) {
        //see if user exists
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }
        //hash password
        //Generate a salt
        const salt = randomBytes(8).toString('hex');
        //Hash the password along with the salt
        const hash = (await scrypt(password, salt, 32)) as Buffer; // type scripte does not know that scrypt will return a buffer
        // join the hashed password and salt together        
        const result = salt + '.' + hash.toString('hex');

        //create user and save it
        const user = await this.usersService.create(email, result);
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }
        return user;
    }
}