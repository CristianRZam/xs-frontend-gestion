export interface BirthRecordRequest {
  id?: number;
  year?: number;
  actNumber?: string;

  personName?: string;
  sex?: string;

  birthPlace?: string;
  birthDatetime?: string; // ISO string, ej: "2025-02-15T10:35:00"

  districtId?: number;
  districtName?: string;
  districtProvince?: string;
  districtDepartment?: string;

  fatherId?: number;
  fatherName?: string;
  fatherNaturalOf?: string;
  fatherNationality?: string;
  fatherOccupation?: string;
  fatherAddress?: string;

  motherId?: number;
  motherName?: string;
  motherNaturalOf?: string;
  motherNationality?: string;
  motherOccupation?: string;
  motherAddress?: string;

  declarantName?: string;
  declarantDocument?: string;

  recordPlace?: string;
  recordDatetime?: string; // ISO string

  modifiedBy?: number;
}

