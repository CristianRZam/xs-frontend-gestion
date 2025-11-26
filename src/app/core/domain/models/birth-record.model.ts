export interface BirthRecordModel {
  id?: number;

  year?: number;
  actNumber?: string;

  personName?: string;
  sex?: string;

  birthPlace?: string;
  birthHour?: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;

  districtId?: number;

  fatherName?: string;
  motherName?: string;

  declarantName?: string;
  declarantDocument?: string;

  recordPlace?: string;
  recordHour?: string;
  recordDay?: number;
  recordMonth?: number;
  recordYear?: number;
}
