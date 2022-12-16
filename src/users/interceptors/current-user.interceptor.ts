import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from '../users.service';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {}
    
    async intercept(context: ExecutionContext, next: CallHandler<any>)  {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session;
        if (userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }
        return next.handle();
        
    }
    
}