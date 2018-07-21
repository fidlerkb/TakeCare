import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Token } from '../../../node_modules/@angular/compiler';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class AuthService {

  token :string;
  
  constructor() { }

  signupUser(email:string,password:string){
    firebase.auth().createUserWithEmailAndPassword(email,password).then(
      //login the same user!!!!
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
      catch(error=>console.log(error));
  }

  getToken(){
     firebase.auth().currentUser.getIdToken()
    .then(
      (tk:string)=>(this.token=tk,
      console.log(tk))
    );
    return this.token;
  };

  isAuthenticated(){
    return this.token != null;
  }

  logOut(){
    firebase.auth().signOut
  }
  // setUserToLS(data:any) {
  //   localStorage.setItem('logdinUser', JSON.stringify(data))
  // }


}

  


