import { Component } from '@angular/core';
import { XsMainSidebar } from "../xs-main-sidebar/xs-main-sidebar";
import { XsMainHeader } from "../xs-main-header/xs-main-header";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'xs-host-view',
  imports: [XsMainSidebar, XsMainHeader, RouterOutlet],
  templateUrl: './xs-host-view.html',
  styleUrl: './xs-host-view.scss'
})
export class XsHostView {
  sidebarVisible: boolean = true;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
