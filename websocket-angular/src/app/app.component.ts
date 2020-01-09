import { Component } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'websocket-angular';


  private socket : WebSocketSubject<any>;
  
  
  public notifications = 0;

    constructor(private webSocketService: WebSocketService) {

        let stompClient = this.webSocketService.connect();

        stompClient.connect({}, frame => {

            stompClient.subscribe('/topic/notification', notifications => {

                this.notifications = JSON.parse(notifications.body).count;

            })

        });

        var host = 'ws://localhost:8080/websocket-backend/socket/notify';

    this.socket = new WebSocketSubject(host);


    this.socket
      .subscribe(
      (message) => {
        console.log(message);
      },
      (err) => console.log(err)
      );
      

       console.log(this.socket)
    }

}
