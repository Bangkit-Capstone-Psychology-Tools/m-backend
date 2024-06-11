import { IsEmail, Length } from 'class-validator';
/**
 * LoginDto class
 * @class
 */
export class RegisterToolDto {
  /** @type {string} */
  @Length(8, 50)
  name: string;
  /** @type {string} */
  @Length(0,1)
  class: string;
  /** @type {string} */
  @Length(8, 50)
  description: string;
  /** @type {string} */
  @Length(10,200)
  apiLink: string;
}
