import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AuthService} from "../../services/auth.service";
import {HttpHeaders} from "@angular/common/http";

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

  constructor(private auth: AuthService) {
    let _this = this;

    this.ws.connect({}, function(frame) {
      _this.ws.subscribe("/topic/lobby", function(message) {
        console.log(message);
      });
    }, function(error) {
      console.log(error);
    });
  }

  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
  }

  send() {
    this.ws.send("/app/lobby", {}, JSON.stringify({"Name": "test"}));
  }
}
