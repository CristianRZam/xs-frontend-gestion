import {Component, Input} from '@angular/core';
import { XsCardDetail } from "../../../../../shared/components/xs-card-detail/xs-card-detail";

@Component({
  selector: 'xs-user-card-detail',
  imports: [XsCardDetail],
  templateUrl: './xs-user-card-detail.html',
  styleUrl: './xs-user-card-detail.scss'
})
export class XsUserCardDetail {
  @Input() totalUsers: number = 0;
  @Input() activeUsers: number = 0;
  @Input() inactiveUsers: number = 0;
  @Input() totalAdmins: number = 0;
}
