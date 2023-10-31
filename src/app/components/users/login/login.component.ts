import { Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{

  usuariosService = inject(UsuariosService);
  public submitted = false;
  public noEncontrado:boolean = false;


  public formulario = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}



  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(40)
        ],
      ],
    });
  }

  get f() {
    return this.formulario.controls;
  }

  async onSubmit() {
    console.log('OnSubmit');
    this.submitted=true;
    this.noEncontrado=false;

    // FORMULARIO NO VALIDO
    if (this.formulario.invalid) {
      // 1. Se muestran errores de validacion (en html)
      console.log('Formulario invalido');
      return;
    }

    // FORMULARIO VALIDO
    else{
      //1. Se hace la peticion a traves de usuariosServices
      console.log(JSON.stringify(this.formulario.value, null, 2));
      //const respuesta = await this.usuariosService.login(this.formulario.value);
      this.usuariosService.login(this.formulario.value).subscribe({
         //2. Si el usuario no ha sido encontrado, mostrar mensaje de error
         error: (error) => {
          console.log('ERROR: \n' + JSON.stringify(error.status));
          this.noEncontrado=true;
          return;


        } ,

        //3. Si el usuario es correcto:
        next: (response) => {

          //3.1. Almacenar en Session Storage
          let user=response.user;
          let token=response.token;

          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("token", JSON.stringify(token));

          //3.2. Comprobar rol
          if(user.role == "1"){
            //3.3 Enviar a la home de admin o jugadores con router: "/admin/jugadores"o "jugadores/home"
            console.log("el user es admin");
            this.router.navigate(['/admin/jugadores']);
          }
          else if(user.role == "2"){
            console.log("El user es jugador");
            this.router.navigate(['/jugadores/home']);
          }




        }});

    }

  }


  onReset(): void {
    this.submitted = false;
    this.formulario.reset();
  }
}
