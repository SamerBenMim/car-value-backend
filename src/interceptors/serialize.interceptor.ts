import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

interface ClassConstructor {
    new(...args: any[]): {};
}


export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerialzeInterceptor(dto));
}

export class SerialzeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {

        //run something before a request is handled by the request handler
        // console.log("before")
        return handler.handle().pipe(
            map((data: any) => {

                return plainToClass(this.dto, data, { excludeExtraneousValues: true });
            })
        );
    }
    // private toSerialize(metatype: Function): boolean{
    //     const types: Function[] = [String, Boolean, Number, Array, Object];
    //     return !types.includes(metatype);
    // }
}