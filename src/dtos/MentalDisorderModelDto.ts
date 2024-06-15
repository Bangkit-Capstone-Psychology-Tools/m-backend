import { Min, Max, Length } from 'class-validator';
/**
 * LoginDto class
 * @class
 */
export class MentalDisorderModelDto {
  @Length(5,20)
  name: string;
  @Min(1)
  @Max(4)
  kesedihan: number; 
  @Min(1)
  @Max(4)
  euphoria: number; 
  @Min(1)
  @Max(4)
  lelah: number; 
  @Min(1)
  @Max(4)
  gangguanTidur: number; 
  @Min(0)
  @Max(1)
  moodSwing: number; 
  @Min(0)
  @Max(1)
  pikiranBunuhDiri: number; 
  @Min(0)
  @Max(1)
  anoreksia: number; 
  @Min(0)
  @Max(1)
  menghormatiOtoritas: number; 
  @Min(0)
  @Max(1)
  memberikanPenjelasan: number; 
  @Min(0)
  @Max(1)
  responsAgresif: number; 
  @Min(0)
  @Max(1)
  tidakPeduli: number; 
  @Min(0)
  @Max(1)
  mudahGugup: number; 
  @Min(0)
  @Max(1)
  mengakuiKesalahan: number; 
  @Min(0)
  @Max(1)
  overthinking: number; 
  @Min(1)
  @Max(10)
  aktivitasSeksual: number; 
  @Min(1)
  @Max(10)
  mudahKonsentrasi: number; 
  @Min(1)
  @Max(10)
  optimis: number; 


  toJson() {
    return {
      kesedihan: this.kesedihan,
      euphoria: this.euphoria,
      lelah: this.lelah,
      gangguanTidur: this.gangguanTidur,
      moodSwing: this.moodSwing,
      pikiranBunuhDiri: this.pikiranBunuhDiri,
      anoreksia: this.anoreksia,
      menghormatiOtoritas: this.menghormatiOtoritas,
      memberikanPenjelasan: this.memberikanPenjelasan,
      responsAgresif: this.responsAgresif,
      tidakPeduli: this.tidakPeduli,
      mudahGugup: this.mudahGugup,
      mengakuiKesalahan: this.mengakuiKesalahan,
      overthinking: this.overthinking,
      aktivitasSeksual: this.aktivitasSeksual,
      mudahKonsentrasi: this.mudahKonsentrasi,
      optimis: this.optimis
    }
  }
}
