import { Controller,Post,Body,Get,Query,Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';
@Controller('auth')
export class UsersController {

    constructor(private  UsersService: UsersService) { }
    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        return this.UsersService.create(body.email,body.password);
    }

    @Get('/:id')
    findUser(@Body('id') id: string){
        return this.UsersService.findOne(parseInt(id));
    }
    @Get()
    findUsers(@Query('email') email: string){
        return this.UsersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Body('id') id: string){
        return this.UsersService.remove(parseInt(id));
    }
}
