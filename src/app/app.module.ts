import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserPerfilComponent } from './components/user-perfil/user-perfil.component';
import { FormularyComponent } from './components/formulary/formulary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserPerfilComponent,
    FormularyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
