import { Component, OnInit, ViewChild,  ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from './../../../services/util.service';
import {Torneo} from "../../../models/torneo";
import { TorneosService } from 'src/app/services/torneos.service';
import { Router } from '@angular/router';
import { param } from 'jquery';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css']
})

export class TorneosComponent implements OnInit{

  @ViewChild('busquedaInput') busquedaInput!: ElementRef;
  busqueda :string ="";

  public torneos!: Torneo[];
  paginaActual: number = 1;
  torneosPorPagina: number = 5;
  totalPaginas: number = 0;
  modalidad= 0; //Modalidades  0:Todos 1:Playa 2:Cesped



  //Ruta API para detalle novedad
  public URLGetImage: String="http://localhost:4200/api/publicaciones/getImage/";

  //Constructor con providers
  constructor(
    private route: ActivatedRoute,
    private _torneosService : TorneosService,
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

    this.cargarTorneos();
  }

  // Peticon GET para cargar los torneos segun la pagina en la que esté y el total de paginas
  private cargarTorneos(){
    var params ={};
    if(this.modalidad!=0) {
      params={...params, modality: this.modalidad};
    }
    if(this.busqueda!=''){
      params={ ...params , place: this.busqueda}
    }

    this._torneosService.listTorneos(this.paginaActual, this.torneosPorPagina, {...params}).subscribe(

      response => {
        if(response.torneos){

          this.torneos = response.torneos;
          this.totalPaginas = response.total_Paginas;
          this.paginaActual = response.pagina;

          console.log( "Pagina Actual:" + response.pagina);
          console.log( "Total de paginas:" + response.total_Paginas);
          console.log( "Total de torneos:" + response.total_Publicaciones);
          console.log( "Torneos:" + JSON.stringify(response.torneos));
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
      this.cargarTorneos();
    }

  }

  cambiarModalidad(modalidad: number, event: Event) {

    this.modalidad=modalidad;
    this.cargarTorneos();
    //Se resetea tanto la 'busqueda' activa , como el campo en sí si hay escrito algo
    this.busquedaInput.nativeElement.value='';
    this.busqueda='';
  }


  realizarBusqueda() {

    //
    const valorInput: string = this.busquedaInput.nativeElement.value;
    this.busqueda=valorInput;

    //Lanzar funcion de busqueda de torneos
    this.cargarTorneos();


    console.log('Valor del input:', valorInput);



  }
}
