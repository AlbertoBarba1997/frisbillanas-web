import { HttpClient, HttpClientModule, HttpHeaders, HttpParams,  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl:string;

  private httpClient = inject(HttpClient);
  constructor() {
    this.baseUrl='http://localhost:4200/api/usuarios';
  }

  public login(formValue: any){
      console.log("formValue: " + formValue);


      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      //return firstValueFrom(
      return  this.httpClient.post<any>('http://localhost:4200/api/usuarios/login', formValue) ;
      //)

    }

}
