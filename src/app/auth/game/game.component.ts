import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  private stompClient;
  private socketUrl = `ws://localhost:8095/socket?token=${this.auth.getJWT()}`;
  private token: String;
  private socket = new WebSocket(this.socketUrl);
  private ws = Stomp.over(this.socket);

  constructor(private auth: AuthService, private route : ActivatedRoute) {
    let _this = this;

    this.ws.connect({}, function(frame) {
      _this.ws.send(`/app/game/${_this.route.snapshot.paramMap.get("id")}`, {}, JSON.stringify({"actionType": "game_init"}));
      
      _this.ws.subscribe(`/topic/game/${_this.route.snapshot.paramMap.get("id")}`, message => {
        
      });
    }, function(error) {
      console.log(error);
    }); 
  }
}
