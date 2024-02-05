import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: any, context: ExecutionContext) =>{ // context = incomming request
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)