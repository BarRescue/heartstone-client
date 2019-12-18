import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import {LobbyComponent} from "./auth/lobby/lobby.component";
import {LoginComponent} from "./non-auth/login/login.component";
import {RegisterComponent} from "./non-auth/register/register.component";
import {NotFoundComponent} from "./non-auth/not-found/not-found.component";
import {AppLayoutComponent} from "./layouts/app-layout/app-layout.component";
import {CleanLayoutComponent} from "./layouts/clean-layout/clean-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: LobbyComponent, pathMatch: 'full' }
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: CleanLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '404', component: NotFoundComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
