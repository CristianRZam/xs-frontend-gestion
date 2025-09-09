import {Component, Input} from '@angular/core';
import {XsCardDetail} from "../../../../../shared/components/xs-card-detail/xs-card-detail";

@Component({
  selector: 'xs-role-card-detail',
    imports: [
        XsCardDetail
    ],
  templateUrl: './xs-role-card-detail.html',
  styleUrl: './xs-role-card-detail.scss'
})
export class XsRoleCardDetail {
  @Input() totalRoles: number = 0;
  @Input() activeRoles: number = 0;
  @Input() inactiveRoles: number = 0;
  @Input() totalPermissions: number = 0;
}
