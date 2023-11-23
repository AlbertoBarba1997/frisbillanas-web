import { HttpClient, HttpClientModule, HttpHeaders, HttpParams,  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TorneosService {

  private baseUrlTorneos:string;
  private baseUrlParticipations :string;

  private httpClient = inject(HttpClient);


  constructor() {
    this.baseUrlTorneos='http://localhost:4200/api/torneos';
    this.baseUrlParticipations ='http://localhost:4200/api/participaciones';
  }



  public listTorneos(pagina:number=1, torneosPorPagina:number=200 , params:any){

      let url : string= this.baseUrlTorneos+"/listTournaments/"+torneosPorPagina+"/"+pagina;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return  this.httpClient.post<any>(url, {headers: headers , params});
  }


  public getTorneo(id:string){

    let url : string= this.baseUrlTorneos+"/getTournament/"+id;
    console.log(url);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return  this.httpClient.get<any>(url, {headers: headers});
  }


  public getTorneoLogeado(id:string, token:string){

    let url : string= this.baseUrlTorneos+"/getTournament/"+id;
    console.log(url);
    console.log('tokennn:',token)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': token});

    return  this.httpClient.get<any>(url, {headers: headers});
  }



  public listParticipantesTorneo(id_torneo:string ){

    let url : string= this.baseUrlParticipations+"/listUsersTournament/"+id_torneo;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return  this.httpClient.get<any>(url, {headers: headers});
  }

  public altaParticipacion(token:string , id_torneo:string ){
    console.log("alta participacion");
    let url : string= this.baseUrlParticipations+"/alta/"+id_torneo;
    console.log(url);
    console.log('tokennn:',token);
    const headers1 = new HttpHeaders({ 'Content-Type': 'application/json' , 'authorization': token});

    return  this.httpClient.post<any>(url,null, {headers: headers1});

  }
  public bajaParticipacion(token:string , id_participacion:string ){
    let url : string= this.baseUrlParticipations+"/baja/"+id_participacion;
    console.log(url);
    console.log('tokennn:',token);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': token});

    return  this.httpClient.delete<any>(url, {headers: headers});


  }



}
