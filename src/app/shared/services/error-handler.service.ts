import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() {}

  getErrorMessage(error: HttpErrorResponse, action: string, entidad: string = ''): string {
    if (error.error?.status === 422) {
      return `Datos inválidos al ${action} ${entidad}: ${error.error.message}`;

    } else if (error.error?.status === 400) {
      return `Error en la petición al ${action} ${entidad}: ${error.error.message}`;

    } else if (error.error?.status === 409) {
      let backendMsg: string = error.error?.message || "Ya existe un registro con valores duplicados.";

      const regex = /El valor '(.+)' ya existe para el campo '(.+)'/i;
      const match = backendMsg.match(regex);

      if (match) {
        const valor = match[1];
        const campo = match[2];
        const campoAmigable = this.mapCampo(campo, entidad);
        // 👇 ahora usamos la entidad directamente en el mensaje
        backendMsg = `Ya existe un ${entidad} con el ${campoAmigable} "${valor}".`;
      }

      return backendMsg;

    } else {
      console.error(`Error inesperado al ${action} ${entidad}`, error);
      return "Ocurrió un error inesperado. Inténtalo de nuevo.";
    }
  }

  /**
   * Traduce el campo técnico a un nombre más amigable
   */
  private mapCampo(campo: string, entidad: string): string {
    const mappings: Record<string, string> = {
      name: 'nombre',
      tipo: 'tipo',
      email: 'correo electrónico',
      username: 'usuario'
    };

    return mappings[campo] || campo;
  }
}
