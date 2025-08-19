import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'xs-main-header',
  standalone: true,
  imports: [
    Menubar, 
    AvatarModule, 
    InputTextModule, 
    CommonModule,
    BreadcrumbModule, OverlayBadgeModule
  ],
  templateUrl: './xs-main-header.html',
  styleUrls: ['./xs-main-header.scss']
})
export class XsMainHeader {
  breadcrumbItems: MenuItem[] = [];

  ngOnInit() {
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/' },
      { label: 'Projects' },
      { label: 'Core' }
    ];
  }
}
