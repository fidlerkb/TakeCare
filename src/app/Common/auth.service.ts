import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Token } from '../../../node_modules/@angular/compiler';
import { Observable } from '../../../node_modules/rxjs';
import { promise } from '../../../node_modules/protractor';

@Injectable()
export class AuthService {
  
  constructor() { }

  signupUser(email:string,password:string):Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email,password).
    then(
      (Response)=> this.getUsersCadintials(Response)  
    )
    .catch(error=>console.log(error));
  }

  loginUser(email:string,password:string){
    return firebase.auth().signInWithEmailAndPassword(email,password).
    then(
      (Response)=>{return this.getUsersCadintials(Response) }
    )
    .catch(error=>{
      console.log(error)});
  }

  getToken(){
    return JSON.parse(localStorage.getItem('logdintoken')) || [];
  };

  logOut(){
    firebase.auth().signOut()
    .then(()=>
      {localStorage.removeItem('logdintoken'),
      localStorage.removeItem('logdinUser')
    }
    )
  }

private getUsersCadintials(response){
  return response.user.getIdToken()
    .then(
      (Response)=>{debugger;
        localStorage.setItem('logdintoken', JSON.stringify(Response))
        return Response;
      }
    );
}

}


