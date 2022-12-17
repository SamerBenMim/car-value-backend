import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';


describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  // fakeAuthService = {
  //   signup: () => Promise.resolve({ id: 1, email: 'a', password: '1' } as any),
  //   signin: () => Promise.resolve({ id: 1, email: 'a', password: '1' } as any),
  // };
  // fakeUserService = {
  //   findOne: () => Promise.resolve({ id: 1, email: 'a', password: '1' } as any),
  //   create: () => Promise.resolve({ id: 1, email: 'a', password: '1' } as any),
  //   find: () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as any]),
  //   update: () => Promise.resolve({ id: 1, email: 'a', password: '1' } as any),
  //   remove: () => Promise.resolve({ id: 1, email: 'a', password: '1' } as any),
  // };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, AuthService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
