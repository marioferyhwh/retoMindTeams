import { Matches } from 'class-validator';

export function IsValidPassword() {
  const pattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const message =
    'The password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number.';
  return Matches(pattern, { message });
}
