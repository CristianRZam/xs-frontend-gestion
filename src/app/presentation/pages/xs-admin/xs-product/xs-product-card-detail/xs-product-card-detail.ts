import {Component, Input} from '@angular/core';
import {XsCardDetail} from '../../../../../shared/components/xs-card-detail/xs-card-detail';

@Component({
  selector: 'xs-product-card-detail',
  imports: [
    XsCardDetail
  ],
  templateUrl: './xs-product-card-detail.html',
  styleUrl: './xs-product-card-detail.scss'
})
export class XsProductCardDetail {
  @Input() totalProducts: number = 0;
  @Input() activeProducts: number = 0;
  @Input() inactiveProducts: number = 0;
  @Input() totalStock: number = 0;

}
