import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XsCard } from '../xs-card/xs-card';

@Component({
  selector: 'xs-card-detail',
  standalone: true,
  imports: [CommonModule, XsCard],
  templateUrl: './xs-card-detail.html',
  styleUrls: ['./xs-card-detail.scss']
})
export class XsCardDetail {
  @Input() titulo: string = '';
  @Input() cantidad: string | number = '';
  @Input() detalle?: string;
  @Input() colorDetalle: string = 'text-gray-400';
  @Input() icono: string = '';
  @Input() color: string = '#3b82f6'; // hex por defecto (Tailwind blue-500)

  /** Devuelve estilos para el contenedor del icono */
  get iconStyles() {
    return {
      'background-color': this.applyOpacity(this.color, 0.15), // fondo con opacidad
      'color': this.color // icono en color puro
    };
  }

  /** Aplica opacidad a un color HEX */
  private applyOpacity(hex: string, opacity: number): string {
    // Si viene en formato HEX (#RRGGBB)
    if (hex.startsWith('#')) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // Si ya es rgb/rgba o nombre de color → usamos tal cual
    return hex;
  }
}
