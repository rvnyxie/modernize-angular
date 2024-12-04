export interface Commune {
  id: number,
  maTinh: string | null,
  maHuyen: string | null,
  maXa: string | null,
  tenXa: string | null,
  isActive: boolean,
  isXaNgheo: boolean,
  isXaMienNui: boolean,
  isXaDanToc: boolean,
  isThanhThi: boolean
}
