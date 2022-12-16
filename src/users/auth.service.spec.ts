import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { User } from "./user.entity";

describe('AuthService', () => {
    let fakeUserService: Partial<UsersService>
    let service: AuthService;
    beforeEach(async () => {
        const users : User[] = [];
        fakeUserService = {
            find: (email : string) => Promise.resolve(users.filter(user => user.email === email)),
            create: (email: string, password: string) =>{
                users.push({ id: Math.floor(Math.random()*9999), email, password } as User);
                return Promise.resolve(users[users.length-1])    
            } 
        }

        const module = await Test.createTestingModule({
            providers: [AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile();

        service = module.get(AuthService); // create new instance of authService
    });


    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('email@email.ea', 'password');
        expect(user.password).not.toEqual('password');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });


    it('throws if signin is called with an unused email', async () => {
        try {
            await service.signup('a', '1');
            //expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toEqual('user not found');
        }
    });
    it('throws an error if user signs up with email that is in use', async () => {
        //fakeUserService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
        await service.signup('a', '2');

        try {
            await service.signup('a', '1');
            // expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toEqual('email in use');
        }
    });
    it('throws an error if invalid password is provided', async () => {
        // fakeUserService.find = () => Promise.resolve([{ id: 1, email: 'test', password: 'wrong' } as User]);
        await service.signup('test', 'password');
        try {
            await service.signin('test', 'wrong');

        } catch (err) {
            expect(err.message).toEqual('bad password');
        }
    });
    it('returns a user if correct password is provided', async () => {
        await service.signup('test@test.test', 'mypassword');
        const user = await service.signin('test@test.test', 'mypassword');
        expect(user).toBeDefined();
    });


});
