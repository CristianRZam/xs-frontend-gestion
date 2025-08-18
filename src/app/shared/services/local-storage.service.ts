import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class LocalStorageService {

  // Guardar dato
  setItem<T>(key: string, value: T): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error al guardar en LocalStorage:', error);
    }
  }

  // Obtener dato
  getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error('Error al leer de LocalStorage:', error);
      return null;
    }
  }

  // Eliminar dato
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el LocalStorage
  clear(): void {
    localStorage.clear();
  }
}
