import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Token } from '../../../node_modules/@angular/compiler';
import { Observable } from '../../../node_modules/rxjs';
import { promise } from '../../../node_modules/protractor';

@Injectable()
export class AuthService {

  token :string;
  
  constructor() { }

  signupUser(email:string,password:string){
    firebase.auth().createUserWithEmailAndPassword(email,password).
    then(
      (Response)=>{Response.user.getIdToken()
        .then(
          (Response)=>{this.token = Response,
            console.log(this.token);
          }
        );
      }
    )
    .catch(error=>console.log(error));
  }

  loginUser(email:string,password:string){
    firebase.auth().signInWithEmailAndPassword(email,password).
    then(
      Response=>{ firebase.auth().currentUser.getIdToken()
        .then(
         (tk:string)=>{this.token=tk
        });
      }
    ).
      catch(error=>alert("user is not signed up"));
  }

  getToken(){
     firebase.auth().currentUser.getIdToken()
    .then(
      (tk:string)=>(this.token=tk,
      console.log(tk)

    ));
    return this.token;
  };

  isAuthenticated(){
    return this.token != null;
  }

  logOut(){
    firebase.auth()
  }

getUsersCadintials(){
   console.log(firebase.auth().currentUser.getIdToken);
}

  // setUserToLS(data:any) {
  //   localStorage.setItem('logdinUser', JSON.stringify(data))
  // }
}

  


