import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit{
  usuarioLogueado: string;

  constructor(private router: Router) {
    this.usuarioLogueado = "Usuario";
  }


  ngOnInit(): void {
    try{
      const userString= sessionStorage.getItem("user");

      if(userString!= null){
        const user = JSON.parse(userString!);
        let nombre= user.name;
        this.usuarioLogueado = nombre;
        //Cargar imagen redonda :)

      }else{
        this.usuarioLogueado = "Usuario no logueado";
      }


    }catch(err){
      this.usuarioLogueado = "Nombre de Usuario";
    }

  }

  navigateToHome() {
    this.router.navigate(['/jugadores/home']); // Navegar a la página de inicio
  }
}
