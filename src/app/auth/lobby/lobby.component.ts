import { Component, OnInit, HostListener } from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AuthService} from "../../services/auth.service";
import {HttpHeaders} from "@angular/common/http";
import { onlinePlayers } from 'src/app/models/onlinePlayers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  private stompClient;
  private socketUrl = `ws://localhost:8095/socket?token=${this.auth.getJWT()}`;
  private token: String;
  private socket = new WebSocket(this.socketUrl);
  private ws = Stomp.over(this.socket);

  public clickable = true;
  public online : onlinePlayers;

  constructor(private auth: AuthService, private route: Router) {
    let _this = this;

    this.ws.connect({}, function(frame) {
      _this.ws.subscribe("/topic/lobby", message => {
        const messageObject = JSON.parse(message.body);
        _this.online = messageObject.onlinePlayers;
      });
    }, function(error) {
      console.log(error);
    });
  }

  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
  }

  search() {
    this.ws.send("/app/lobby", {}, JSON.stringify({"actionType": "search_game"}));

    this.ws.subscribe("/user/topic/search", message => {
      const messageObject = JSON.parse(message.body);

      switch(messageObject.type) {
        case "game_started_state":
          this.ws.disconnect();
          this.route.navigate(['/game', messageObject.gameId]);
        break;
        case "searching_state":
          this.clickable = false;
        break;
      }
    });
  }
}
