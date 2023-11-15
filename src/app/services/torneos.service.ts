import { HttpClient, HttpClientModule, HttpHeaders, HttpParams,  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TorneosService {

  private baseUrl:string;

  private httpClient = inject(HttpClient);
  constructor() {
    this.baseUrl='http://localhost:4200/api/torneos';
  }

  public listTorneos(pagina:number=1, torneosPorPagina:number=200 , params:any){

      var url : string= this.baseUrl+"/listTournaments/"+torneosPorPagina+"/"+pagina;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      console.log(params);
      //return firstValueFrom(
      return  this.httpClient.post<any>(url, {headers: headers , params});
      //)
  }

  public getTorneo(id:string){

    //
  }

}
