import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const headers = new HttpHeaders()
  .set("Content-Type", "application/json")
  .set('Access-Control-Allow-Origin','*');

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient, private cookieService : CookieService) {
  }

  public Post(url: string, content: object) : Observable<any>{
    return this.httpClient.post(url, content, {headers : headers});
  }

  public Get(url : string) : Observable<any>{
    return this.httpClient.get(url, {headers : headers});
  }
}
