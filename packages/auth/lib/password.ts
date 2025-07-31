import { Scrypt } from "lucia";

export async function hashPassword(password: string) {
  return await new Scrypt().hash(password);
}

export async function verifyPassword(hashedPassword: string, password: string) {
  return new Scrypt().verify(hashedPassword, password);
}
