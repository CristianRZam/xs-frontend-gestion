import { Component } from '@angular/core';
import { XsPageHeader } from "../../../../../shared/components/xs-page-header/xs-page-header";
import { XsUserCardDetail } from "../xs-user-card-detail/xs-user-card-detail";
import { XsUserFilter } from "../xs-user-filter/xs-user-filter";
import { XsUserTable } from "../xs-user-table/xs-user-table";

@Component({
  selector: 'xs-user-view',
  imports: [XsPageHeader, XsUserCardDetail, XsUserFilter, XsUserTable],
  templateUrl: './xs-user-view.html',
  styleUrl: './xs-user-view.scss'
})
export class XsUserView {

}
