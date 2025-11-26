import { Component } from '@angular/core';
import {XsButton} from '../../../../shared/components/xs-button/xs-button';
import {XsCardDetail} from '../../../../shared/components/xs-card-detail/xs-card-detail';

@Component({
  selector: 'xs-dashboard',
  imports: [
    XsButton,
    XsCardDetail
  ],
  templateUrl: './xs-dashboard.html',
  styleUrl: './xs-dashboard.scss'
})
export class XsDashboard {

}
