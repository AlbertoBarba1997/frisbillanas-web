import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from './../../../services/util.service';
import {Novedad} from "../../../models/novedad";
import { NovedadesService } from 'src/app/services/novedades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit{

  //Control de paginas (actual, el n de novedades por pag, el total de pags resultante)
  public novedades!: Novedad[];
  paginaActual: number = 1;
  noticiasPorPagina: number = 4;
  totalPaginas: number = 0;

  //Ruta API para detalle novedad
  public URLGetImage: String="http://localhost:4200/api/publicaciones/getImage/";

  //Constructor con providers
  constructor(
    private route: ActivatedRoute,
    private _novedadesService : NovedadesService,
    private router: Router,
    private utilService : UtilService){

      this.route.params.subscribe(params => {
        if(params['pagina'])
        this.paginaActual = params['pagina'];
        else
        this.paginaActual=1;
      });

    }

  ngOnInit(): void {

    this.cargarNovedades();
  }

  // Peticon GET para cargar las novedades segun la pagina en la que esté y el total de paginas
  private cargarNovedades(){
    this._novedadesService.listNovedades(this.paginaActual, this.noticiasPorPagina).subscribe(

      response => {
        if(response.publicaciones){

          this.novedades = response.publicaciones;
          this.totalPaginas = response.total_Paginas;
          this.paginaActual = response.pagina;

          console.log( "Pagina Actual:" + response.pagina)
          console.log( "Total de paginas:" + response.total_Paginas)
          console.log( "Novedades:" + JSON.stringify(response.publicaciones))
        }

      },
      error => {
        console.log(error);
      }
    )

  }

  getPaginas(): number[] {
    // Genera una lista de números de página, por ejemplo, [1, 2, 3, ...]
    return Array.from({ length: this.totalPaginas }, (_, index) => index + 1);
  }

  cambiarPagina(valor: number) {
    console.log(valor);
    if(valor<=this.totalPaginas){
      this.paginaActual=valor;
      this.cargarNovedades();
    }

  }






}
