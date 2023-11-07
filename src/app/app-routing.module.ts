import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';

//Componentes de Jugador
import { HomeComponent } from './components/jugador/home/home.component';
import { ContenidoComponent } from './components/jugador/contenido/contenido.component';
import { NovedadesComponent } from './components/jugador/novedades/novedades.component';
import { SpiritComponent } from './components/jugador/spirit/spirit.component';
import { TorneosComponent } from './components/jugador/torneos/torneos.component';
import { DetalleNovedadComponent } from './components/jugador/detalle-novedad/detalle-novedad.component';


//Componentes de Admin
import { JugadoresComponent } from './components/admin/jugadores/jugadores.component';



const routes: Routes = [
  //Principal:
  { path: 'login', component: LoginComponent},
  //Jugador:
  { path: 'jugadores/home', component: HomeComponent},
  { path: 'jugadores/novedades', component: NovedadesComponent},
  { path: 'jugadores/contenido', component: ContenidoComponent},
  { path: 'jugadores/torneos', component: TorneosComponent},
  { path: 'jugadores/spirit', component: SpiritComponent},
  { path: 'jugadores/novedad/:id', component: DetalleNovedadComponent},

  // Admin:
  { path: 'admin/jugadores', component:JugadoresComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
