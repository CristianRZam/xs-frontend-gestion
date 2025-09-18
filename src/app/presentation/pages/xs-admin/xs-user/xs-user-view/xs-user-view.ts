import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { XsPageHeader } from "../../../../../shared/components/xs-page-header/xs-page-header";
import { XsUserCardDetail } from "../xs-user-card-detail/xs-user-card-detail";
import { XsUserFilter } from "../xs-user-filter/xs-user-filter";
import { XsUserTable } from "../xs-user-table/xs-user-table";
import {XsLoader} from '../../../../../shared/components/xs-loader/xs-loader';
import {XsToast} from '../../../../../shared/components/xs-toast/xs-toast';
import {ErrorHandlerService} from '../../../../../shared/services/error-handler.service';
import {UserUseCase} from '../../../../../core/application/use-cases/user.usecase';
import {UserModel} from '../../../../../core/domain/models/user.model';
import {XsUserRegister} from '../xs-user-register/xs-user-register';
import {UserFormResponse} from '../../../../../core/domain/dtos/responses/user-form.response';
import {UserFormRequest} from '../../../../../core/domain/dtos/resquests/user-form.request';

@Component({
  selector: 'xs-user-view',
  imports: [
    XsPageHeader,
    XsUserCardDetail,
    XsUserFilter,
    XsUserTable,
    XsLoader,
    XsToast,
    XsUserRegister,
  ],
  templateUrl: './xs-user-view.html',
  styleUrl: './xs-user-view.scss'
})
export class XsUserView implements OnInit, AfterViewInit {
  @ViewChild('xsLoader') loader!: XsLoader;
  @ViewChild('xsToastUserView') private toast!: XsToast;
  @ViewChild(XsUserRegister) userRegister!: XsUserRegister;

  public users: UserModel[] = [];  public totalUsers = 0;
  public formData: UserFormResponse = {
    documentTypes: [],
    roles: []
  };


  public activeUsers = 0;
  public inactiveUsers = 0;
  public totalAdmins = 0;
  filter: { name: string; page: number; size: number } = {
    name: '',
    page: 0,
    size: 5
  };

  constructor(private userUseCase: UserUseCase, private errorHandler: ErrorHandlerService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.load();
    });
  }

  load() {
    this.loader.show('Cargando...');

    this.userUseCase.init(this.filter).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const data = response.data;
          this.users = data.users;
          this.totalUsers = data.totalUsers;
          this.activeUsers = data.activeUsers;
          this.inactiveUsers = data.inactiveUsers;
          this.totalAdmins = data.totalAdmins;
        } else {
          console.warn('No se recibieron datos válidos de roles', response);
        }
        this.loader.hide();
      },
      error: (err) => {
        console.error('Error al cargar roles', err);
        this.loader.hide();
      }
    });
  }

  loadUserById(opcion: 'AGREGAR' | 'MODIFICAR' = 'MODIFICAR', id?: number) {
    this.loader.show('Cargando datos...');

    const request: UserFormRequest = { id };
    this.userUseCase.initForm(request).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.formData = response.data;

          this.userRegister.openDialog(
            opcion,
            opcion === 'AGREGAR' ? 'Registrar nuevo usuario' : 'Editar usuario',
            this.formData
          );
        } else {
          console.warn('No se recibieron datos válidos', response);
        }
        this.loader.hide();
      },
      error: (err) => {
        console.error('Error al cargar datos', err);
        this.loader.hide();
      }
    });
  }


  updateFilter(event: { name: string } = { name: '' }) {
    this.filter.name = event.name;
    this.filter.page = 0;
    this.filter.size = this.filter.size || 5;

    this.load();
  }

  onAddItem() {
    this.loadUserById('AGREGAR');
  }

  create($event: UserModel) {

  }

  update($event: UserModel) {

  }
}
