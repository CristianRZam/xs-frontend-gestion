import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface SidebarItem {
  label: string;
  icon?: string;
  routerLink?: string;
  expanded?: boolean;
  active?: boolean;
  badge?: number;
  children?: SidebarItem[];
}

@Component({
  selector: 'xs-main-sidebar',
  standalone: true,
  imports: [ButtonModule, Ripple, AvatarModule, CommonModule, RouterModule],
  templateUrl: './xs-main-sidebar.html',
  styleUrls: ['./xs-main-sidebar.scss']
})
export class XsMainSidebar {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private router: Router) {
    // Detectar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.markActiveByUrl(event.urlAfterRedirects);
    });
  }

  toggleSidebar() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  sidebarSections: { label: string; expanded: boolean; items: SidebarItem[] }[] = [
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
            { label: 'Usuarios', icon: 'fas fa-users', routerLink: '/admin/user' },
            { label: 'Roles', icon: 'fas fa-user-tag', routerLink: '/admin/role' }
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
        }
      ]
    }
  ];

  // Selecciona item manualmente
  selectItem(selected: SidebarItem) {
    this.clearActiveExcept(selected);
    selected.active = true;
    // Expandir padres si tiene hijos
    if (selected.children) {
      selected.expanded = !selected.expanded;
    }
  }

  // Limpiar active en todo el sidebar excepto el seleccionado
  private clearActiveExcept(selected: SidebarItem) {
    this.sidebarSections.forEach(section =>
      section.items.forEach(item => this.clearActiveRecursive(item, selected))
    );
  }

  private clearActiveRecursive(item: SidebarItem, exception: SidebarItem) {
    if (item !== exception) {
      item.active = false;
    }
    if (item.children) {
      item.children.forEach(child => this.clearActiveRecursive(child, exception));
    }
  }

  // Marca items activos según la URL
  private markActiveByUrl(url: string) {
    this.sidebarSections.forEach(section =>
      section.items.forEach(item => this.markActiveRecursive(item, url))
    );
  }

  private markActiveRecursive(item: SidebarItem, url: string): boolean {
    let isActive = false;

    if (item.routerLink) {
      // Solo marcamos activo exacto si no tiene hijos
      if (!item.children) {
        item.active = url === item.routerLink;
        isActive = item.active;
      }
    }

    if (item.children) {
      let childActive = false;
      item.children.forEach(child => {
        if (this.markActiveRecursive(child, url)) {
          childActive = true;
        }
      });

      if (childActive) {
        item.expanded = true; // expandir padre si algún hijo está activo
        item.active = true;   // padre también activo
        isActive = true;
      } else {
        // Si ningún hijo está activo, colapsar el padre y desactivarlo
        item.expanded = false;
        item.active = url === item.routerLink; // activo solo si la ruta exacta coincide
      }
    }

    return isActive;
  }


}
