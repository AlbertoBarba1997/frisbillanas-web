import { HttpClient, HttpClientModule, HttpHeaders, HttpParams,  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TorneosService {

  private baseUrl:string;
  private baseUrlParticipations :string;

  private httpClient = inject(HttpClient);


  constructor() {
    this.baseUrl='http://localhost:4200/api/torneos';
    this.baseUrlParticipations ='http://localhost:4200/api/participaciones';
  }



  public listTorneos(pagina:number=1, torneosPorPagina:number=200 , params:any){

      let url : string= this.baseUrl+"/listTournaments/"+torneosPorPagina+"/"+pagina;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return  this.httpClient.post<any>(url, {headers: headers , params});
  }


  public getTorneo(id:string){

    let url : string= this.baseUrl+"/getTournament/"+id;
    console.log(url);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return  this.httpClient.get<any>(url, {headers: headers});
  }


  public getTorneoLogeado(id:string, token:string){

    let url : string= this.baseUrl+"/getTournament/"+id;
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


}
