import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { endpoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwtHelper : JwtHelperService = new JwtHelperService();

  constructor(private httpService: HttpService, private cookieService: CookieService) { }

  public login(email: String, password: String) {
    return this.httpService.Post(endpoints.login, {
      email: email,
      password: password
    });
  }

  public register(email: String, password: String, firstName: String, lastName: String) {
    return this.httpService.Post(endpoints.register, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    });
  }
}
