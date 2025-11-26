import { Component } from '@angular/core';
import { XsIngresar } from '../xs-ingresar/xs-ingresar';
import {XsLoginCarousel} from '../xs-login-carousel/xs-login-carousel';

@Component({
  selector: 'xs-login-view',
  imports: [
    XsIngresar,
    XsLoginCarousel
  ],
  templateUrl: './xs-login-view.html',
  styleUrl: './xs-login-view.scss'
})
export class XsLoginView {

}
