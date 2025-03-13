// src/utils/bcrypt.handle.ts
import { hash, compare } from "bcryptjs";

export const encrypt = async (pass: string): Promise<string> => {
  const passwordHash = await hash(pass, 8);
  return passwordHash;
};

export const verified = async (pass: string, passHash: string): Promise<boolean> => {
  return await compare(pass, passHash);
};
