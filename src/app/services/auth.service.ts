import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
  .set("Content-Type", "application/json")
  .set('Access-Control-Allow-Origin','*');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper : JwtHelperService = new JwtHelperService();

  constructor(private cookie: CookieService, private http: HttpClient) {}

  public isAuthenticated(): boolean {
    const token = this.cookie.get("JWT");

    return !this.jwtHelper.isTokenExpired(token);
  }

  public getJWT() : string {
    const token = this.cookie.get("JWT");

    if(!this.jwtHelper.isTokenExpired(token)) {
      return token;
    }
  }

  public getUserId() : String {
    return this.jwtHelper.decodeToken(this.getJWT()).sub;
  }

  public getUserEmail() : string {
    return this.jwtHelper.decodeToken(this.getJWT()).email;
  }

  public getUsername() : String {
    return this.jwtHelper.decodeToken(this.getJWT()).username;
  }
}
