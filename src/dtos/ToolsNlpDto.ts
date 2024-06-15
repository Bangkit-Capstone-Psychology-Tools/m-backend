import { IsEmail, Length } from 'class-validator';
/**
 * LoginDto class
 * @class
 */
export class ToolsNlpDto {
  @Length(5,20)
  name: string;
  /** @type {string} */
  @Length(8, 1000)
  answers: string;

  toJson() {
    return {
      answers: this.answers
    }
  }
}
