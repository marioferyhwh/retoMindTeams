import * as bcrypt from 'bcrypt';

export async function encryptPassword(password: string): Promise<string> {
  const hashPasswords = await bcrypt.hash(password, 9);
  return hashPasswords;
}

export async function comparePassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, passwordHash);
}
