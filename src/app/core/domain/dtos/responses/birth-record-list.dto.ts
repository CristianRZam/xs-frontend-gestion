export interface BirthRecordListDTO {
  id: number;

  year: number;
  actNumber: string;

  personName: string;
  sex: string;

  birthPlace: string;
  birthDatetime: string;

  districtId: number;
  districtName: string;

  fatherId: number;
  fatherName: string;

  motherId: number;
  motherName: string;

  declarantName: string;
  declarantDocument: string;

  recordPlace: string;
  recordDatetime: string;
}
