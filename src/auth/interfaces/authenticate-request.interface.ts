import { Request } from 'express';
import { JwtUser } from './user-request.interface';

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}
