import { UtilService } from './../../../services/util.service';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Novedad} from "../../../models/novedad";
import { NovedadesService } from 'src/app/services/novedades.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-detalle-novedad',
  templateUrl: './detalle-novedad.component.html',
  styleUrls: ['./detalle-novedad.component.css']
})
export class DetalleNovedadComponent implements OnInit {

  public id : string = "0";
  public novedad!: Novedad;
  public URLGetImage: String="http://localhost:4200/api/publicaciones/getImage/";

  constructor(private route: ActivatedRoute,
     private _novedadesService : NovedadesService,
     private router: Router,
     private utilService : UtilService) {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Ahora puedes utilizar el valor de "id" en tu componente
    });
  }
  ngOnInit(): void {
    this.cargarNovedad(this.id);
  }



  private cargarNovedad(id : string){

    this._novedadesService.getNovedad(id).subscribe(
      response => {
        if(response){
          if(response.publication) this.novedad = response.publication;
        }
      },
      error => {
        console.log(error);
        this.navigateToHome();
        alert("Error al cargar la noticia. Redireccionando a la home.")
      }
    )

  }

  navigateToHome() {
    this.router.navigate(['/jugadores/home']); // Navegar a la página de inicio
  }

  formatFecha(fecha:Date) {
    this.utilService.formatoFechaPersonalizado(fecha.toString());
  }

  procesarTexto(texto: string): string {
    return this.utilService.procesarTexto(texto);

  }





}
