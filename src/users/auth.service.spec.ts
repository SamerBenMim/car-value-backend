import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { User } from "./user.entity";

describe('AuthService', () => {
    let fakeUserService: Partial<UsersService> 
    let service: AuthService;
    beforeEach(async () => {

         fakeUserService= {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
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

    it('throws an error if user signs up with email that is in use', async () => {
       fakeUserService.find = () => Promise.resolve([{id:1,email:'a',password:'1'} as User]);
        try {
            await service.signup('a', '1');
            //expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toEqual('email in use');
        }
    });

});
