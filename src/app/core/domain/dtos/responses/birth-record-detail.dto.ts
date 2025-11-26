export interface BirthRecordDetail {
  id: number;

  // Datos generales
  year: number;
  actNumber: string;

  personName: string;
  sex: string;

  birthPlace: string;
  birthDatetime: Date; // Cambiado a Date

  // Localidad
  districtId: number | null;
  districtName: string | null;
  districtProvince: string | null;
  districtDepartment: string | null;

  // Datos del padre
  fatherId: number | null;
  fatherName: string | null;
  fatherNaturalOf: string | null;
  fatherNationality: string | null;
  fatherOccupation: string | null;
  fatherAddress: string | null;

  // Datos de la madre
  motherId: number | null;
  motherName: string | null;
  motherNaturalOf: string | null;
  motherNationality: string | null;
  motherOccupation: string | null;
  motherAddress: string | null;

  // Declarante
  declarantName: string | null;
  declarantDocument: string | null;

  // Expedición del acta
  recordPlace: string | null;
  recordDatetime: Date; // Cambiado a Date
}
