import { IsEmail, Length, Max, Min } from 'class-validator';
/**
 * LoginDto class
 * @class
 */
export class RegisterToolDto {
  /** @type {string} */
  @Length(8, 50)
  name: string;
  /** @type {string} */
  @Min(1)
  @Max(4)
  class: number;
  /** @type {string} */
  @Length(8, 50)
  description: string;
  /** @type {string} */
  @Length(10,200)
  path: string;
}
