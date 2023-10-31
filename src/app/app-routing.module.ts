import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { HomeComponent } from './components/jugador/home/home.component';
import { JugadoresComponent } from './components/admin/jugadores/jugadores.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'jugadores/home', component: HomeComponent},
  { path: 'admin/jugadores', component:JugadoresComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
