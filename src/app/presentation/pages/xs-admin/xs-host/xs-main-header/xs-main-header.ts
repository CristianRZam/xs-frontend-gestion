import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MenuModule } from 'primeng/menu';
import { XsButton } from "../../../../../shared/components/xs-button/xs-button";
import {Ripple} from 'primeng/ripple';
import {AuthService} from '../../../../../infraestructure/persistence/auth.service';
import {Router, RouterLink} from '@angular/router';
import {UserModel} from '../../../../../core/domain/models/user.model';
import {Formvalidators} from '../../../../../shared/validators/form-validators';

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
    XsButton,
    Ripple,
    RouterLink
  ],
  templateUrl: './xs-main-header.html',
  styleUrls: ['./xs-main-header.scss']
})
export class XsMainHeader implements OnInit {
  @Input() breadcrumbItems: MenuItem[] = [];
  @Input() user: UserModel = {};

  @Output() toggleSidebar = new EventEmitter<void>();

  avatarMenuItems: MenuItem[] = [];

  @ViewChild('avatarMenu') avatarMenu: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private util: Formvalidators
  ) {}

  public image: string=''
  public initials: string = '';

  ngOnInit() {
    this.avatarMenuItems = [
      { label: 'Perfil', icon: 'fa-solid fa-user',  routerLink: '/admin/profile'  },
      { label: 'Configuración', icon: 'fa-solid fa-cog' },
      { separator: true },
      { label: 'Cerrar sesión', icon: 'fa-solid fa-power-off', isLogout: true ,  command: () => this.logout() }
    ];

    this.initials = this.util.getInitials(this.user?.person?.fullName);
  }


  toggleAvatarMenu(event: Event) {
    this.avatarMenu.toggle(event);
  }

  onMenuClick() {
    this.toggleSidebar.emit();
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/']);
  }

}
