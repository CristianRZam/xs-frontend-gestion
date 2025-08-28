import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MenuModule } from 'primeng/menu';
import { XsButton } from "../../../../../shared/components/xs-button/xs-button";

@Component({
  selector: 'xs-main-header',
  standalone: true,
  imports: [
    Menubar,
    AvatarModule,
    InputTextModule,
    CommonModule,
    BreadcrumbModule, 
    OverlayBadgeModule,
    MenuModule,
    XsButton
  ],
  templateUrl: './xs-main-header.html',
  styleUrls: ['./xs-main-header.scss']
})
export class XsMainHeader {
  @Output() toggleSidebar = new EventEmitter<void>();

  breadcrumbItems: MenuItem[] = [];
  avatarMenuItems: MenuItem[] = [];

  @ViewChild('avatarMenu') avatarMenu: any; 

  ngOnInit() {
    this.breadcrumbItems = [
      { label: 'Home', routerLink: '/' },
      { label: 'Dashboard' },
    ];

    this.avatarMenuItems = [
        { label: 'Perfil', icon: 'fa-solid fa-user' },
        { label: 'Configuración', icon: 'fa-solid fa-cog' },
        { separator: true },
        { label: 'Cerrar sesión', icon: 'fa-solid fa-power-off', isLogout: true }
    ];
  }

  toggleAvatarMenu(event: Event) {
    this.avatarMenu.toggle(event);
  }

  onMenuClick() {
    this.toggleSidebar.emit();
  }
}
