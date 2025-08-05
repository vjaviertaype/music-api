import { Role } from '@prisma/client';
import { JwtStandardPayload } from './jwt-standad-payload.interface';

export interface JwtUser extends JwtStandardPayload {
  id: string;
  email: string;
  role: Role;
}
