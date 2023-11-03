import { HttpClient, HttpClientModule, HttpHeaders, HttpParams,  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  private baseUrl:string;

  private httpClient = inject(HttpClient);
  constructor() {
    this.baseUrl='http://localhost:4200/api/publicaciones';
  }

  public listNovedades(pagina:number=1, novedadesPorPagina:number=200){

      var url : string= this.baseUrl+"/listPublications/"+novedadesPorPagina+"/"+pagina;

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      //return firstValueFrom(
      return  this.httpClient.get<any>(url, {headers: headers});
      //)

    }
}
