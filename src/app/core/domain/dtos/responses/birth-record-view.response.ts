import {BirthRecordListDTO} from './birth-record-list.dto';


export interface BirthRecordViewResponse {
  birthRecords: BirthRecordListDTO[];
  totalRecords: number;
  recordsThisMonth: number;
  maleCount: number;
  femaleCount: number;
}
