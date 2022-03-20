import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getClientIp } from 'request-ip';

export type RequestIpParam = string | null;

export const RequestIp = createParamDecorator<
  unknown,
  ExecutionContext,
  RequestIpParam
>((_, executionContext) => {
  const request = executionContext.switchToHttp().getRequest();
  return getClientIp(request);
});
