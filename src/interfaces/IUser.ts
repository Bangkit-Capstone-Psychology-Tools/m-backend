/**
 * IUser interface
 * @interface
 */
export interface IUser {
  id: string;
  name: string;
  isVerified: Boolean;
  photoUrl: string | null;
  email: string;
  noHp: string | null;
  birthday: Date | null;
  class: number;
  nik: string | null;
  certificateCredential: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: any;
  result?: any;
  treatmentSession?: any;
  psikologAdditionalData?: any;
}
