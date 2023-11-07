import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  formatoFechaPersonalizado(fecha: string): string {
    console.log(fecha);
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }


  procesarTexto(texto: string): string {

    // Reemplazar los saltos de línea por <br> y envolverlo en un párrafo
    const lineas = texto.split('\n');
    const parrafos = lineas.map((linea) => `<p>${linea}</p>`);
    return parrafos.join('');
  }
}


