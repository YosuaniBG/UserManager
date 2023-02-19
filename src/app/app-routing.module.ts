import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularyComponent } from './components/formulary/formulary.component';
import { HomeComponent } from './components/home/home.component';
import { UserPerfilComponent } from './components/user-perfil/user-perfil.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
  {path: 'user/:id', component: UserPerfilComponent},
  {path: 'newuser', component: FormularyComponent},
  {path: 'updateuser/:id', component: FormularyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
