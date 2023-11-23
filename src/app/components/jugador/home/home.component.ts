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
  public id1!: string;
  public id2!: string;
  public id3!: string;
  public URLGetImage: String="http://localhost:4200/api/publicaciones/getImage/";

  constructor(
    private _novedadesService : NovedadesService
  ){

  }

  ngOnInit(): void {
    this.cargarUltimasNovedades();
    window.scrollTo(0, 0);
  }

  private cargarUltimasNovedades(){
    this._novedadesService.listNovedades(1, 3).subscribe(

      response => {
        if(response.publicaciones){

          this.novedades = response.publicaciones;

          if(this.novedades.length>0){
            this.id1=this.novedades[0]._id;
            console.log(this.id1);
          }
          if(this.novedades.length>1) this.id2=this.novedades[1]._id;
          if(this.novedades.length>2) this.id3=this.novedades[2]._id;


        }

      },
      error => {
        console.log(error);
      }
    )

  }


}
