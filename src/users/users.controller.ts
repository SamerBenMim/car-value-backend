import { Controller, UseInterceptors, ClassSerializerInterceptor, Post, Body, Get, NotFoundException, Query, Param, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerialzeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
@Controller('auth')
@Serialize(UserDto)//this will serialize the all response
export class UsersController {

    constructor(private UsersService: UsersService) { }
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.UsersService.create(body.email, body.password);
    }
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.UsersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }
    @Get()
    async findUsers(@Query('email') email: string) {
        const user = await this.UsersService.find(email);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.UsersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: Partial<UpdateUserDto>) {
        return this.UsersService.update(parseInt(id), body);
    }
}
