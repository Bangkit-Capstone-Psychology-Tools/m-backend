import { IsEmail, Length } from 'class-validator';
/**
 * LoginDto class
 * @class
 */
export class LoginDto {
  /** @type {string} */
  @Length(0,40)
  uuid: string;
  /** @type {string} */
  @IsEmail()
  email: string;
}
