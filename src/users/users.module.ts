import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
@Module({
  imports: [TypeOrmModule.forFeature([User])],//create repository
  controllers: [UsersController],
  providers: [UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR, //this will make the interceptor global
      useClass :CurrentUserInterceptor 
    }]
})
export class UsersModule {}
