import { IsEmail, Length } from 'class-validator';
/**
 * LoginDto class
 * @class
 */
export class LoginDto {
  /** @type {string} */
  @Length(0,40)
  id: string;
  /** @type {string} */
  @IsEmail()
  email: string;
}
