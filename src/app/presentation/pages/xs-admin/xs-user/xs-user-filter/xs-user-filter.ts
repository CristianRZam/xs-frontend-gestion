import { Component } from '@angular/core';
import { XsFieldset } from "../../../../../shared/components/xs-fieldset/xs-fieldset";
import { XsInputText } from "../../../../../shared/components/xs-input-text/xs-input-text";
import { XsButton } from "../../../../../shared/components/xs-button/xs-button";

@Component({
  selector: 'xs-user-filter',
  imports: [XsFieldset, XsInputText, XsButton],
  templateUrl: './xs-user-filter.html',
  styleUrl: './xs-user-filter.scss'
})
export class XsUserFilter {

}
