import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { XsButton } from '../../../../shared/components/xs-button/xs-button';
import { CommonModule } from '@angular/common';
import { XsMainHeader } from "../xs-host/xs-main-header/xs-main-header";

@Component({
  selector: 'xs-admin-host',
  imports: [RouterOutlet, XsButton, CommonModule, RouterModule, XsMainHeader],
  templateUrl: './xs-admin-host.html',
  styleUrls: ['./xs-admin-host.scss']
})
export class XsAdminHost {
  public gruposPlugin: GrupoPluginModel[] = [];
  public menuItemsUser: MenuItem[] = [];
  public isSidebarExpanded: boolean = false;

  @ViewChild('xsMainSidebar') xsMainSidebar!: ElementRef;
  @ViewChild('xsMainContent') xsMainContent!: ElementRef;

  login = {
    name: 'Juan',
    lastName: 'Pérez',
    fullName: 'Juan Pérez',
    shortName: 'JP'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarDatosHardcode();
  }

  cargarDatosHardcode() {
    // Menú de usuario
    this.menuItemsUser = [
      { label: 'Ir al portal', icon: 'pi pi-home', command: () => this.router.navigateByUrl('/inicio') },
      { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];

    // Plugins simulados
    this.gruposPlugin = [
      {
        label: 'Gestión de Usuarios',
        isExpanded: false,
        plugins: [
          { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/admin/usuarios', descripcion: 'Gestiona los usuarios del sistema' },
          { label: 'Roles', icon: 'pi pi-shield', routerLink: '/admin/roles', descripcion: 'Gestiona los roles de usuario' }
        ]
      },
      {
        label: 'Configuración',
        isExpanded: false,
        plugins: [
          { label: 'Parámetros', icon: 'pi pi-cog', routerLink: '/admin/config/parametros', descripcion: 'Parámetros generales' },
          { label: 'Logs', icon: 'pi pi-file', routerLink: '/admin/config/logs', descripcion: 'Revisa los logs del sistema' }
        ]
      }
    ];
  }

  expandSidebar() {
    this.xsMainSidebar.nativeElement.classList.add('expanded');
    this.xsMainContent.nativeElement.classList.add('sidebar-expanded');
    this.isSidebarExpanded = true;
  }

  contraerSidebar() {
    this.xsMainSidebar.nativeElement.classList.remove('expanded');
    this.xsMainContent.nativeElement.classList.remove('sidebar-expanded');
    this.isSidebarExpanded = false;
  }

  onClickGrupo(grupo: GrupoPluginModel) {
    grupo.isExpanded = !grupo.isExpanded;
  }

  logout() {
    console.log('Cerrar sesión simulada');
    this.router.navigateByUrl('/');
  }
}

// Interfaces
export interface GrupoPluginModel {
  label?: string;
  isExpanded?: boolean;
  plugins?: PluginSelectModel[] | MenuItem[];
}

export interface PluginSelectModel {
  label?: string;
  descripcion?: string;
  icon?: string;
  routerLink?: string;
}

export interface MenuItem {
  label?: string;
  icon?: string;
  command?: () => void;
}
