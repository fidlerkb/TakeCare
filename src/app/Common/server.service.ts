import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/Http';
import 'rxjs/Rx';
import { map } from '../../../node_modules/rxjs/operator/map';
import { AuthService } from './auth.service';
import { User } from '../../../node_modules/firebase';

@Injectable()
export class ServerService {

  constructor(private http:Http,private authservice:AuthService) { }

  
  postDataToServer(data:User,token:string){
    // const token = this.authservice.getToken();
    return this.http.post('https://takecare-2fa62.firebaseio.com/data.json?auth='+token,data);
  }

  putDataToServer(data:any[],token:string){
    return this.http.put('https://takecare-2fa62.firebaseio.com/data.json?auth='+token,data);
  }

  getDataFromServer(){
    const token = this.authservice.getToken();
    return this.http.get('https://takecare-2fa62.firebaseio.com/data.json')
    .map(
      (responce : Response) => {
        const data = responce.json();
        return data;
      }
    );
  }

  // getDataFromDBAsync(){
  //   const token = this.authservice.getToken();
  //   return this.http.get('https://takecare-2fa62.firebaseio.com/data.json')
  //   .map(
  //     (responce:Response)=>{
  //       return responce.json()
  //     }
  //   );
  // }

}
