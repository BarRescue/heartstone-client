import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginEmail: string;
  loginPassword: string;
  public loginError: string = "";

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) {
  }

  onSubmit(email: String, password: String) {
    console.log(email + " " + password);

    this.loginError = '';
    this.userService.login(email, password).subscribe(response => {
        this.cookieService.set("JWT", response["token"]);
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 400) {
          this.loginError = "Wrong email or password";
        }
      });
  }
}
