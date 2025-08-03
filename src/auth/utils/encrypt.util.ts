import * as bcrypt from 'bcrypt';

export async function compare(hashedPassword: string, comparePassword: string) {
  return bcrypt.compare(comparePassword, hashedPassword);
}

export async function hash(password: string) {
  return await bcrypt.hash(password, 10);
}
