import { UtilService } from './../../../services/util.service';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Torneo} from "../../../models/torneo";
import { TorneosService } from 'src/app/services/torneos.service';
import { Router } from '@angular/router';
import { Participacion } from 'src/app/models/participacion';
import {Participante} from "../../../models/participante";

@Component({
  selector: 'app-detalle-torneo',
  templateUrl: './detalle-torneo.component.html',
  styleUrls: ['./detalle-torneo.component.css']
})
export class DetalleTorneoComponent {

  public idTorneo : string = "0";
  public torneo!: Torneo;
  public URLGetImageTorneo: string="http://localhost:4200/api/torneos/getImage/";
  public URLGetImageUser: string="http://localhost:4200/api/usuarios/getAvatar/";
  public logeado : boolean = false;
  public token :string ='';
  public participa :boolean = false;
  public id_participacion : string = '';
  public participaciones! : Participacion[];

  constructor(private route: ActivatedRoute,
     private _torneosService : TorneosService,
     private router: Router,
     private utilService : UtilService) {

    this.route.params.subscribe(params => {
      this.idTorneo = params['id'];
      // Ahora puedes utilizar el valor de "id" en tu componente
    });
  }
  ngOnInit(): void {
    this.comprobarUsuarioLogeado();
    this.cargarTorneo(this.idTorneo);
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

      this._torneosService.getTorneo(id).subscribe(
        response => {
          if(response){
            if(response.tournament) this.torneo = response.tournament;

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
    this._torneosService.listParticipantesTorneo(id).subscribe(
        response => {
          if(response){
            if(response.participations) this.participaciones = response.participations;
            console.log('PARTICIPANTES CARGADO:',this.participaciones);
          }
        },
        error => {
          console.log(error);
          /*this.navigateToTorneos();
          alert("Error al cargar el torneo. Redireccionando al listado de torneos...");*/
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

    //1.Metodo para dar de baja la participacion
    this._torneosService.altaParticipacion(this.token, this.idTorneo).subscribe(
      response => {
        if(response){
          //2. Metodo para recargar las participaciones de la tabla
          this.cargarParticipantes(this.idTorneo);
          //3. Resetear false para que el boton vuelva a poner "Despuntarse"
          this.participa=true;
          //4. Actualizar participacion
          try{
            this.id_participacion=response.participation_stored._id;
            console.log("Nueva Participacion! :" + response.participation_stored._id)
          }catch(err){}
        }

      },

      error => {
        console.log(error);
        //4. Mostrar mensaje de error
      }
    )

  }

  desapuntarse(){
    // A traves de una peticion Http, crea un registro en la base de datos de participacion

    //1.Metodo para dar de baja la participacion
    this._torneosService.bajaParticipacion(this.token, this.id_participacion).subscribe(
      response => {
        if(response){
          console.log(response);
          //2. Metodo para recargar las participaciones de la tabla
          this.cargarParticipantes(this.idTorneo);
          //3. Resetear false para que el boton vuelva a poner "Despuntarse"
          this.participa=false;
        }

      },

      error => {
        console.log(error);
        //4. Mostrar mensaje de error
      }
    )
  }


  procesarTexto(texto: string): string {
    return this.utilService.procesarTexto(texto);
  }
}


