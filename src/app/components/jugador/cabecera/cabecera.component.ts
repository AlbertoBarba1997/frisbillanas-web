import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit{
  usuarioLogueado: string = "Usuario";
  avatarLogueado: string = "";
  public URLGetImageUser: string ="http://localhost:4200/api/usuarios/getAvatar/";

  constructor(private router: Router) {  }


  ngOnInit(): void {
    try{
      const userString= sessionStorage.getItem("user");

      if(userString!= null){
        const user = JSON.parse(userString!);

        this.usuarioLogueado = user.name;
        this.avatarLogueado = user.avatar;
        console.log("AVATAR:" + this.avatarLogueado);

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
