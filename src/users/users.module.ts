import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
@Module({
  imports: [TypeOrmModule.forFeature([User])],//create repository
  controllers: [UsersController],
  providers: [UsersService,AuthService]
})
export class UsersModule {}
