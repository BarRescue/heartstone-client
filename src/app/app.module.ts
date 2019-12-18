import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './auth/lobby/lobby.component';
import { LoginComponent } from './non-auth/login/login.component';
import { RegisterComponent } from './non-auth/register/register.component';
import { NotFoundComponent } from './non-auth/not-found/not-found.component';
import { CleanLayoutComponent } from './layouts/clean-layout/clean-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {UserService} from "./services/user/user.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CleanLayoutComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    HttpClient,
    AuthService,
    AuthGuardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
