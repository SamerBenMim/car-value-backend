import {
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: never, ctx: ExecutionContext) => { //data is the data passed to the decorator and ctx is the execution context
        const request = ctx.switchToHttp().getRequest();
        return request.currentUser;
    }
);

