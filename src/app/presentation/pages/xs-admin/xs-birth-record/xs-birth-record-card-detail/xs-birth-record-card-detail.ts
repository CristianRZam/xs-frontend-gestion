import {Component, Input} from '@angular/core';
import {XsCardDetail} from '../../../../../shared/components/xs-card-detail/xs-card-detail';

@Component({
  selector: 'xs-birth-record-card-detail',
  imports: [
    XsCardDetail
  ],
  templateUrl: './xs-birth-record-card-detail.html',
  styleUrl: './xs-birth-record-card-detail.scss'
})
export class XsBirthRecordCardDetail {
  @Input() totalRecords: number = 0;
  @Input() recordsThisMonth: number = 0;
  @Input() maleCount: number = 0;
  @Input() femaleCount: number = 0;
}
