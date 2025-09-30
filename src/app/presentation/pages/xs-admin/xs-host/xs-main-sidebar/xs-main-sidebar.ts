import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  HostListener,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../../../infraestructure/persistence/auth.service';
import { MenuItem } from 'primeng/api';
import { UserModel } from '../../../../../core/domain/models/user.model';
import { Formvalidators } from '../../../../../shared/validators/form-validators';

interface SidebarItem {
  label: string;
  icon?: string;
  routerLink?: string;
  expanded?: boolean;
  active?: boolean;
  badge?: number;
  children?: SidebarItem[];
  permission?: string | string[];
}

@Component({
  selector: 'xs-main-sidebar',
  standalone: true,
  imports: [ButtonModule, Ripple, AvatarModule, CommonModule, RouterModule],
  templateUrl: './xs-main-sidebar.html',
  styleUrls: ['./xs-main-sidebar.scss'],
})
export class XsMainSidebar implements OnInit {
  @Input() visible: boolean = false;
  @Input() user: UserModel = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  public image: string = '';
  public initials: string = '';
  public isMobile: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private util: Formvalidators
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.markActiveByUrl(event.urlAfterRedirects);
      });

    this.applyPermissions();
  }

  ngOnInit(): void {
    this.initials = this.util.getInitials(this.user?.person?.fullName);
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 1024;
  }


  closeSidebar() {
    if (this.isMobile) {
      this.visible = false;
      this.visibleChange.emit(this.visible);
    }
  }

  sidebarSections: { label: string; expanded: boolean; items: SidebarItem[] }[] =
    [
      {
        label: 'INICIO',
        expanded: true,
        items: [
          { label: 'Dashboard', icon: 'fas fa-home', routerLink: '/admin' },
        ],
      },
      {
        label: 'MANTENEDORES',
        expanded: true,
        items: [
          {
            label: 'Seguridad',
            icon: 'fas fa-user-shield',
            expanded: false,
            permission: ['VIEW_USER', 'VIEW_ROLE'],
            children: [
              {
                label: 'Usuarios',
                icon: 'fas fa-users',
                routerLink: '/admin/user',
                permission: 'VIEW_USER',
              },
              {
                label: 'Roles',
                icon: 'fas fa-user-tag',
                routerLink: '/admin/role',
                permission: 'VIEW_ROLE',
              },
            ],
          },
          {
            label: 'Configuraciones',
            icon: 'fas fa-cogs',
            expanded: false,
            permission: ['VIEW_PARAMETER', 'VIEW_SETTINGS'],
            children: [
              {
                label: 'Parámetros',
                icon: 'fas fa-sliders-h',
                routerLink: '/admin/parameter',
                permission: 'VIEW_PARAMETER',
              },
              {
                label: 'Ajustes generales',
                icon: 'fas fa-wrench',
                permission: 'VIEW_SETTINGS',
              },
            ],
          },
        ],
      },
    ];

  selectItem(selected: SidebarItem) {
    this.clearActiveExcept(selected);
    selected.active = true;
    if (selected.children) {
      selected.expanded = !selected.expanded;
    }
    if (this.isMobile) {
      this.closeSidebar();
    }
  }

  private clearActiveExcept(selected: SidebarItem) {
    this.sidebarSections.forEach((section) =>
      section.items.forEach((item) =>
        this.clearActiveRecursive(item, selected)
      )
    );
  }

  private clearActiveRecursive(item: SidebarItem, exception: SidebarItem) {
    if (item !== exception) {
      item.active = false;
    }
    if (item.children) {
      item.children.forEach((child) =>
        this.clearActiveRecursive(child, exception)
      );
    }
  }

  private markActiveByUrl(url: string) {
    this.sidebarSections.forEach((section) =>
      section.items.forEach((item) => this.markActiveRecursive(item, url))
    );
  }

  private markActiveRecursive(
    item: SidebarItem,
    url: string,
    trail: MenuItem[] = []
  ): boolean {
    let isActive = false;
    const currentTrail = [...trail, { label: item.label, routerLink: item.routerLink }];

    if (item.routerLink && !item.children) {
      item.active = url === item.routerLink;
      isActive = item.active;
    }

    if (item.children) {
      let childActive = false;
      item.children.forEach((child) => {
        if (this.markActiveRecursive(child, url, currentTrail)) {
          childActive = true;
        }
      });

      if (childActive) {
        item.expanded = true;
        item.active = true;
        isActive = true;
      } else {
        item.expanded = false;
        item.active = url === item.routerLink;
      }
    }

    return isActive;
  }

  private applyPermissions() {
    const permissions = this.authService.getPermissions();

    const hasAnyPermission = (
      itemPermission: string | string[] | undefined
    ): boolean => {
      if (!itemPermission) return true;
      if (Array.isArray(itemPermission)) {
        return itemPermission.some((p) => permissions.includes(p));
      }
      return permissions.includes(itemPermission);
    };

    const filterItemsByPermission = (items: SidebarItem[]): SidebarItem[] => {
      return items
        .map((item) => {
          if (item.children) {
            item.children = filterItemsByPermission(item.children);
          }

          const hasVisibleChildren = item.children && item.children.length > 0;
          const hasPermission = hasAnyPermission(item.permission);

          if (hasPermission || hasVisibleChildren) {
            return item;
          }

          return null;
        })
        .filter((item) => item !== null) as SidebarItem[];
    };

    this.sidebarSections.forEach((section) => {
      section.items = filterItemsByPermission(section.items);
    });
  }
}
