/**
 * IMentalDisorderModel interface
 * @interface
 */

export interface IMentalDisorderModel {
  kesedihan: number; // 1 (Sering) - 4 (Jarang)
  euphoria: number; // 1 (Sering) - 4 (Jarang)
  lelah: number; // 1 (Sering) - 4 (Jarang)
  gangguanTidur: number; // 1 (Sering) - 4 (Jarang)
  moodSwing: number; // 0 (False) - 1 (True)
  pikiranBunuhDiri: number; // 0 (False) - 1 (True)
  anoreksia: number; // 0 (False) - 1 (True)
  menghormatiOtoritas: number; // 0 (False) - 1 (True)
  memberikanPenjelasan: number; // 0 (False) - 1 (True)
  responsAgresif: number; // 0 (False) - 1 (True)
  tidakPeduli: number; // 0 (False) - 1 (True)
  mudahGugup: number; // 0 (False) - 1 (True)
  mengakuiKesalahan: number; // 0 (False) - 1 (True)
  overthinking: number; // 0 (False) - 1 (True)
  aktivitasSeksual: number; // 1 (Tidak Pernah) - 10 (Sering)
  mudahKonsentrasi: number; // 1 (Tidak Pernah) - 10 (Sering)
  optimis: number; // 1 (Tidak Pernah) - 10 (Sering)
}

