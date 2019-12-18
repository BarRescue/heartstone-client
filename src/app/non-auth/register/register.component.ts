import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  registerPassword : string;
  registerEmail : string;
  public registerError : string;

  constructor(private router : Router, private userService : UserService, private cookieService : CookieService) {}

  onSubmit(email : String, password : String, firstName : String, lastName : String){
    this.userService.register(email, password, firstName, lastName).subscribe(response =>{
      console.log(response.body);
      this.registerError = '';
      this.cookieService.set("JWT", response["token"]);
      this.router.navigate(['/']);
    },
    (error) => {
      if(error.status === 400){
        this.registerError = "E-mail adres is al in gebruik";
      }
    });

  }

  ngOnInit() {
  }

}
