export interface BirthRecordResponse {
  id: number;

  year: number;
  actNumber: string;

  personName: string;
  sex: string;

  birthPlace: string;
  birthDatetime: string;

  districtId: number | null;
  districtName: string | null;

  fatherId: number | null;
  fatherName: string | null;
  fatherNaturalOf: string | null;
  fatherNationality: string | null;
  fatherOccupation: string | null;
  fatherAddress: string | null;

  motherId: number | null;
  motherName: string | null;
  motherNaturalOf: string | null;
  motherNationality: string | null;
  motherOccupation: string | null;
  motherAddress: string | null;

  declarantName: string | null;
  declarantDocument: string | null;

  recordPlace: string | null;
  recordDatetime: string;

  createdAt?: string | null;
  modifiedAt?: string | null;
}
