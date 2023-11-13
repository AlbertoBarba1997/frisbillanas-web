import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Módulos importados
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/users/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

//Componentes mios
import { UsuariosService } from './services/usuarios.service';
import { HomeComponent } from './components/jugador/home/home.component';
import { JugadoresComponent } from './components/admin/jugadores/jugadores.component';
import { TorneosComponent } from './components/jugador/torneos/torneos.component';
import { NovedadesComponent } from './components/jugador/novedades/novedades.component';
import { ContenidoComponent } from './components/jugador/contenido/contenido.component';
import { CabeceraComponent } from './components/jugador/cabecera/cabecera.component';
import { SpiritComponent } from './components/jugador/spirit/spirit.component';
import { FooterComponent } from './components/jugador/footer/footer.component';
import { CarrouselComponent } from './components/jugador/carrousel/carrousel.component';
import { DetalleNovedadComponent } from './components/jugador/detalle-novedad/detalle-novedad.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CabeceraComponent,
    HomeComponent,
    JugadoresComponent,
    TorneosComponent,
    NovedadesComponent,
    ContenidoComponent,
    SpiritComponent,
    FooterComponent,
    CarrouselComponent,
    DetalleNovedadComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,


  ],
  providers: [UsuariosService, HttpClient , DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
