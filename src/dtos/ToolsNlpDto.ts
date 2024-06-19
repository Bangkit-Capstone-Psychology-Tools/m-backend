import { IsEmail, Length } from 'class-validator';
/**
 * LoginDto class
 * @class
 */
export class ToolsNlpDto {
  @Length(0,50)
  name: string;
  /** @type {string} */
  @Length(8, 1000)
  answers: string;
}
