import { Component } from '@angular/core';
import { XsTable } from '../../../../../shared/components/xs-table/xs-table';
import {XsTableColumn} from '../../../../../shared/components/xs-table/xs-table.model';

@Component({
  selector: 'xs-user-table',
  standalone: true,
  imports: [
    XsTable
  ],
  templateUrl: './xs-user-table.html',
  styleUrls: ['./xs-user-table.scss']
})
export class XsUserTable {
  usuarios = [
    { nombre: 'Juan Perez', activo: true, rol: 'Administrador', prueba: 'prueba'},
    { nombre: 'María López', activo: false, rol: 'Usuario', prueba: 'prueba'},
    { nombre: 'Carlos Díaz', activo: true, rol: 'Usuario', prueba: 'prueba'}
  ];

  columns = [
    new XsTableColumn({ field: 'nombre', headerText: 'Nombre', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'activo', headerText: 'Activo', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'rol', headerText: 'Rol', displayOnInit: true, isDefault: true }),
    new XsTableColumn({ field: 'prueba', headerText: 'Prueba', displayOnInit: true, isDefault: true }),
  ];

  agregarUsuario() {
    console.log('Agregar usuario');
  }

  modificarUsuario(usuario: any) {
    console.log('Modificar usuario', usuario);
  }

  eliminarUsuario(usuario: any) {
    console.log('Eliminar usuario', usuario);
  }
}
