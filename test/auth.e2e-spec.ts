import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentification system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'email@mail.mail';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'email@mail.mail',password: 'password' })
      .expect(201)
      .then((res) => {
        const { email, id } = res.body;
        expect(email).toEqual(email);
        expect(id).toBeDefined();
    });
  });
});
