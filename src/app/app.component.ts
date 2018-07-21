import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';


  ngOnInit(){
    firebase.initializeApp(
      {
        apiKey: "AIzaSyBkucdrFkMPSFGrnaHo_VbZ0YwUdAekx5A",
        authDomain: "takecare-2fa62.firebaseapp.com",
      }
    );
  }
}

