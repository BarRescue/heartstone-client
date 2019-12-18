import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public connect(url) : Stomp {
    let ws = new SockJS(url);
    return Stomp.over(ws);
  }
}
