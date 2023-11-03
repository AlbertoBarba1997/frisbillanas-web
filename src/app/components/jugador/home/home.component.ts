import { Component, OnInit } from '@angular/core';
import {Novedad} from "../../../models/novedad";
import { NovedadesService } from 'src/app/services/novedades.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public novedades!: Novedad[];

  constructor(
    private _novedadesService : NovedadesService
  ){

  }

  ngOnInit(): void {
    this.cargarUltimasNovedades();
  }

  private cargarUltimasNovedades(){
    this._novedadesService.listNovedades(1, 3).subscribe(

      response => {
        if(response.publicaciones){

          this.novedades = response.publicaciones;
          console.log(this.novedades);
        }

      },
      error => {
        console.log(error);
      }
    )

  }


}
