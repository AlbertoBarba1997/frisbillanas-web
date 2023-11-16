import { UtilService } from './../../../services/util.service';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Torneo} from "../../../models/torneo";
import { TorneosService } from 'src/app/services/torneos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-torneo',
  templateUrl: './detalle-torneo.component.html',
  styleUrls: ['./detalle-torneo.component.css']
})
export class DetalleTorneoComponent {

  public id : string = "0";
  public torneo!: Torneo;
  public URLGetImage: string="http://localhost:4200/api/usuarios/getImage/";
  public logeado : boolean = false;
  public token :string ='';
  public participa :boolean = false;
  public id_participacion : string = '';

  constructor(private route: ActivatedRoute,
     private _torneosService : TorneosService,
     private router: Router,
     private utilService : UtilService) {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Ahora puedes utilizar el valor de "id" en tu componente
    });
  }
  ngOnInit(): void {
    this.comprobarUsuarioLogeado();
    this.cargarTorneo(this.id);
  }


  private cargarTorneo(id : string){

    // Si está logueado, a parte del torneo, podrá consultar si está apuntado o  permitir apuntarse
    if(this.logeado){

      this._torneosService.getTorneoLogeado(id, this.token).subscribe(
        response => {
          if(response){
            //Si trae un torneo correctamente
            if(response.tournament){
              //Guarda las propiedades del torneo obtrenido de la peticion
              this.torneo = response.tournament;

              //Si trae el campo "participation" lleno con el id, quiere decir que participa
              if(response.participation && response.participation!=""){
                this.participa=true;
                this.id_participacion=response.participation._id;
                console.log("id de la participacion:"+this.id_participacion);
              }
              //Si no trae participacion lo setearemos a false, para despues ajustar el boton y funciones de apuntarse/desapuntarse
              else{
                this.participa=false;
                this.id_participacion="";
                console.log("No participa.");
              }

              console.log('TORNEO CARGADO:',this.torneo.name);
              //Por ultimo, carga los participantes del torneo para mostrarlos en una tabla
              this.cargarParticipantes(this.torneo._id);

            }

          }
        },
        error => {

          console.log(error);
          this.navigateToTorneos();
          alert("Error al cargar el torneo. Redireccionando al listado de torneos...");
        }
      )
    }
    else{
      console.log('entra');
      this._torneosService.getTorneo(id).subscribe(
        response => {
          if(response){
            if(response.tournament) this.torneo = response.tournament;
            console.log('TORNEO CARGADO:',this.torneo.name);
          }
        },
        error => {
          console.log(error);
          this.navigateToTorneos();
          alert("Error al cargar el torneo. Redireccionando al listado de torneos...");
        }
      )
    }
  }

  private cargarParticipantes(id : string){
    // Carga los participantes de un torneo
    console.log('Cargando participantes...');
    this._torneosService.getTorneo(id).subscribe(
        response => {
          if(response){
            if(response.tournament) this.torneo = response.tournament;
            console.log('TORNEO CARGADO:',this.torneo.name);
          }
        },
        error => {
          console.log(error);
          this.navigateToTorneos();
          alert("Error al cargar el torneo. Redireccionando al listado de torneos...");
        }
      )
  }



  private comprobarUsuarioLogeado() {
    try{
      const tokenString= sessionStorage.getItem("token");

      if(tokenString!= null){
        this.token= tokenString;
        this.logeado=true;
        console.log("token logueado:"+this.token);
      }else{
        this.logeado=false;
      }
    }catch(err){
      this.logeado=false;
    }
  }


  navigateToTorneos() {
    // Navegar a la página de torneos
    this.router.navigate(['/jugadores/torneos']);
  }

  navigateToHome() {
    // Navegar a la página de inicio
    this.router.navigate(['/jugadores/home']);
  }


  apuntarse(){
    // A traves de una peticion Http, crea un registro en la base de datos de participacion
  }

  desapuntarse(){
    // A traves de otra peticion Http, elimina un registro en la base de datos de participacion
  }


  procesarTexto(texto: string): string {
    return this.utilService.procesarTexto(texto);
  }
}


