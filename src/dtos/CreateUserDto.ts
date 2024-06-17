import { IsDate, IsEmail, IsString, Length, Max, Min } from 'class-validator';

/**
 * CreateUserDto class
 * @class
 */
export class CreateUserDto {
  /**
   * @type {string}
   */
  @Length(32,50)
  id: string;

  /**
   * @type {string}
   */
  @IsEmail()
  email: string;
  
  @Length(6, 100)
  @IsString()
  name: string;
  
  @Length(0,200)
  photoUrl?: string;

  @Length(6, 13)
  noHp: string;

  @IsDate()
  birthday: Date;

  @Min(1)
  @Max(4)
  class: number;

  @Length(15, 20)
  nik: string;

  @Length(0,100)
  certificateCredential: string;

}
