import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/Http';
import 'rxjs/Rx';
import { map } from '../../../node_modules/rxjs/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class ServerService {

  constructor(private http:Http,private authservice:AuthService) { }

  
  postDataToServer(data :any){
    const token = this.authservice.getToken();
    console.log(data);
    return this.http.post('https://takecare-2fa62.firebaseio.com/data.json?auth='+token,data);
  }

  putDataToServer(data :any){
    const token = this.authservice.getToken();
    return this.http.put('https://takecare-2fa62.firebaseio.com/data.jsonauth='+token,data);
  }

  getDataFromServer(){
    const token = this.authservice.getToken();
    return this.http.get('https://takecare-2fa62.firebaseio.com/data.json?auth='+token)
    .map(
      (responce : Response) => {
        const data = responce.json();
        return data;
      }
    );
  }

  getDataFromDBAsync(){
    const token = this.authservice.getToken();
    return this.http.get('https://takecare-2fa62.firebaseio.com/data.json?auth='+token)
    .map(
      (responce:Response)=>{
        return responce.json()
      }
    );
  }

}
