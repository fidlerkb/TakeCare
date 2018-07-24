import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UsersService } from './Common/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private userservice:UsersService){

  }

  ngOnInit(){
    //this.userservice.getDataFromServer();

    firebase.initializeApp(
      {
        apiKey: "AIzaSyBkucdrFkMPSFGrnaHo_VbZ0YwUdAekx5A",
        authDomain: "takecare-2fa62.firebaseapp.com",
      }
    );
  }
}

