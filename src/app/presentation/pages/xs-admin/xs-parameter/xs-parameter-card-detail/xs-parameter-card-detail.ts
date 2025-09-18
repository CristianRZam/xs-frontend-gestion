import {Component, Input} from '@angular/core';
import {XsCardDetail} from '../../../../../shared/components/xs-card-detail/xs-card-detail';

@Component({
  selector: 'xs-parameter-card-detail',
  imports: [
    XsCardDetail
  ],
  templateUrl: './xs-parameter-card-detail.html',
  styleUrl: './xs-parameter-card-detail.scss'
})
export class XsParameterCardDetail {
  @Input() totalParameters: number = 0;
  @Input() activeParameters: number = 0;
  @Input() inactiveParameters: number = 0;
  @Input() parametersWithParent: number = 0;
}
