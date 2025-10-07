import { Component, OnInit } from '@angular/core';
import { XsMainSidebar } from "../xs-main-sidebar/xs-main-sidebar";
import { XsMainHeader } from "../xs-main-header/xs-main-header";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserModel } from '../../../../../core/domain/models/user.model';
import { AuthService } from '../../../../../infraestructure/persistence/auth.service';
import { filter } from 'rxjs/operators';
import {DrawerModule} from 'primeng/drawer';
import {XsMainConfig} from '../xs-main-config/xs-main-config';

@Component({
  selector: 'xs-host-view',
  imports: [
    XsMainSidebar,
    XsMainHeader,
    RouterOutlet,
    DrawerModule,
    XsMainConfig
  ],
  templateUrl: './xs-host-view.html',
  styleUrl: './xs-host-view.scss'
})
export class XsHostView implements OnInit {
  sidebarVisible: boolean = true;
  configVisible: boolean = false;
  breadcrumbItems: MenuItem[] = [];
  public user: UserModel = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userData = this.authService.getUser();
    if (userData) {
      this.user = userData;
    }

    this.sidebarVisible = window.innerWidth >= 1024;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbItems = this.buildBreadcrumbs(this.route.root);
      });

    this.breadcrumbItems = this.buildBreadcrumbs(this.route.root);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  toggleConfig() {
    this.configVisible = !this.configVisible;
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (child.snapshot.data['breadcrumb']) {
        const bc = child.snapshot.data['breadcrumb'] as MenuItem[];
        breadcrumbs = [...breadcrumbs, ...bc];
      }

      breadcrumbs = this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }


}
