import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'xs-main-sidebar',
  standalone: true,
  imports: [ButtonModule, Ripple, AvatarModule, CommonModule, RouterModule],
  templateUrl: './xs-main-sidebar.html',
  styleUrls: ['./xs-main-sidebar.scss']
})
export class XsMainSidebar {
  @Input() visible: boolean = false; // por defecto cerrado en mobile
  @Output() visibleChange = new EventEmitter<boolean>();

  toggleSidebar() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  sidebarSections = [
    {
      label: 'FAVORITES',
      expanded: true,
      items: [
        { label: 'Dashboard', icon: 'fas fa-home', routerLink: '/admin' },
        {
          label: 'Seguridad',
          icon: 'fas fa-user-shield',
          expanded: false,
          children: [
            { label: 'Usuarios', icon: 'fas fa-users', routerLink: '/admin/user'},
            { label: 'Roles', icon: 'fas fa-user-tag', routerLink: '/admin/role'},
          ]
        },
        {
          label: 'Configuraciones',
          icon: 'fas fa-cogs',
          expanded: false,
          children: [
            { label: 'Parámetros', icon: 'fas fa-sliders-h', routerLink: '/admin/parameter' },
            { label: 'Ajustes generales', icon: 'fas fa-wrench' }
          ]
        },
        {
          label: 'Reports',
          icon: 'fas fa-chart-line',
          expanded: false,
          children: [
            {
              label: 'Revenue',
              icon: 'fas fa-chart-line',
              expanded: false,
              children: [
                { label: 'View', icon: 'fas fa-table' },
                { label: 'Search', icon: 'fas fa-search' }
              ]
            },
            { label: 'Expenses', icon: 'fas fa-chart-line' }
          ]
        },
        { label: 'Team', icon: 'fas fa-users' },
        { label: 'Messages', icon: 'fas fa-comments', badge: 3 },
        { label: 'Calendar', icon: 'fas fa-calendar' },
        { label: 'Settings', icon: 'fas fa-cog' }
      ]
    },
    {
      label: 'APPLICATION',
      expanded: true,
      items: [
        { label: 'Projects', icon: 'fas fa-folder' },
        { label: 'Performance', icon: 'fas fa-chart-bar' },
        { label: 'Settings', icon: 'fas fa-cog' }
      ]
    }
  ];

  selectItem(selected: any) {
    this.sidebarSections.forEach(section => section.items.forEach(item => this.removeActive(item)));
    selected.active = true;
  }

  private removeActive(item: any) {
    item.active = false;
    if (item.children) item.children.forEach((child: any) => this.removeActive(child));
  }
}
