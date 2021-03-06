import { Injectable } from '@angular/core';
import { User, eRoll } from '../Models/Entitys.model';
import { Subject } from '../../../node_modules/rxjs/Subject';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { ServerService } from './server.service';
import { Guid } from '../../../node_modules/guid-typescript';
import { Response } from '../../../node_modules/@angular/Http';
import { AuthService } from './auth.service';


@Injectable()
export class UsersService {

  constructor(private serverservice:ServerService,private authservice : AuthService) {
      //this.initDataToServer();
      this.getDataFromServer();
    }

  Users : User[] = [
    {
      id:Guid.create().toString(),
      firstName:"max",
      lastName:"fidler",
      password:"1234",
      email:"fidlerkb@gmail.com",
      phone:"0526499224",
      address:"Ze'ev Orlov St 10, Petah Tikva, Israel",
      location:{x:32.090696,y:34.876625,radius:5000,draggable:false,lable:null},
      careTaker: {photo:"assets/Media/men1.jpg",ratingMark:4.5,ratingCount:2,age:32,reviewes:null,available:false,about:"great worker",roll:eRoll.babysitter,
      requestedSallery:{paymentFrequancy:'hourly',amount:35,currency:'nis'}}
  } ,
  {
    id:Guid.create().toString(),
    firstName:"or",
    lastName:"gilor",
    password:"1111",
    address:"Ze'ev Orlov St 20, Petah Tikva, Israel",
    email:"gimel@gmail.com",
    phone:"05496585987",
    location:{x:32.090196,y:34.896604,radius:5000,draggable:false,lable:null},
    careTaker: ({photo:"assets/Media/men2.jpg",ratingMark:5,ratingCount:1,age:32,reviewes:null,available:true,about:"great worker",roll:eRoll.dogsitter,
    requestedSallery:{paymentFrequancy:'daly',amount:50,currency:'nis'}})
  },
  {
    id:Guid.create().toString(),
    firstName:"shiran",
    lastName:"kaby",
    password:"2222",
    address:"Ze'ev Orlov St 30, Petah Tikva, Israel",
    email:"shirankaby@gmail.com",
    phone:"0549374002",
    location:{x:32.190696,y:34.976604,radius:5000,draggable:false,lable:null},
    careTaker: ({photo:"assets/Media/woman1.jpg",ratingMark:4.5,ratingCount:2,age:32,reviewes:null,available:false,about:"great worker",roll:eRoll.nanny,
    requestedSallery:{paymentFrequancy:'monthly',amount:7000,currency:'nis'}})
  } ,
  {
    id:Guid.create().toString(),
    firstName:"limor",
    lastName:"gilor",
    password:"1111",
    address:"Ze'ev Orlov St 40, Petah Tikva, Israel",
    email:"limi86@gmail.com",
    phone:"0549374001",
    location:{x:32.817971,y:34.970947,radius:5000,draggable:false,lable:null},
    careTaker: ({photo:"assets/Media/woman2.jpg",ratingMark:4,ratingCount:3,age:32,reviewes:null,available:false,about:"great worker",roll:eRoll.babysitter,
    requestedSallery:{paymentFrequancy:'hourly',amount:35,currency:'nis'}})
  } ,
  {
    id:Guid.create().toString(),
    firstName:"oz",
    lastName:"fidler",
    address:"Ze'ev Orlov St 15, Petah Tikva, Israel",
    password:"1234",
    email:"ozib@gmail.com",
    phone:"0526499224",
    location:{x:32.090696,y:35.876604,radius:5000,draggable:false,lable:null},
    careTaker: {photo:"assets/Media/men4.jpg",ratingMark:4.6,ratingCount:1,age:32,reviewes:null,available:false,about:"great worker",roll:eRoll.babysitter,
    requestedSallery:{paymentFrequancy:'hourly',amount:35,currency:'nis'}}
} ,
  {
    id:Guid.create().toString(),
    firstName:"tempo",
    lastName:"tempo",
    password:"1111",
    address:"Ze'ev Orlov St 5, Petah Tikva, Israel",
    email:"tempo6@gmail.com",
    phone:"0549374001",
    location:{x:32.090696,y:34.876604,radius:5000,draggable:false,lable:null},
    careTaker: null
  }
]; 
  isLocationView:boolean = false;
  proffesion:eRoll;

  selectedUser = new BehaviorSubject<User>(null);
  selectedAsLocation = new BehaviorSubject<User[]>(null);
  logedInUser = new BehaviorSubject<User>(null);


  // initDataToServer(){
  //     let token = this.getlogdinTokenFromLS();
  //     this.serverservice.putDataToServer(this.Users,token).subscribe(
  //       (Response)=>console.log(Response),
  //       (error)=>console.log(error)
  //     );
  // }

  getDataFromServer(){
    this.serverservice.getDataFromServer().subscribe(
      (users:any[])=>{
        this.Users = users,
        console.log(users)
      },
      (error)=>console.log(error)
    );
  }

  addUserToDB(user:User,token:string){
    this.getDataFromServer();
    this.Users.push(user);
    this.serverservice.putDataToServer(this.Users,token).subscribe(
      (Response)=>console.log(Response),
      (error)=>console.log(error)
    );
  }

  addNewUser(user:User){
    if(user!=null){
      this.addLogedInUserToLS(user);
    }
  }

  returnCareTakersList(){   
    return this.Users.filter((item)=>item.careTaker != null && item.careTaker.roll == this.proffesion );
  }

  finedUserById(id:string){
    let user:User;
    return user= this.Users.find((user)=>user.id==id);
  }
  finedUserByMail(mail:string){
    let user:User;
    return user= this.Users.find((u)=>u.email===mail);
  }

  returnAllUsers(){
    return this.Users;
  }

  returnTopCareTaker(roll:eRoll){
    let _rating:number = 0;
    let id :string;
    this.Users.forEach(u => {
      if(u.careTaker!=null){
        if(u.careTaker.ratingMark > _rating && u.careTaker.roll == roll){
          _rating = u.careTaker.ratingMark;
          id=u.id;
      }
    }});
    return id;   
  }

  isLogdIn(){
    let token :String;
    token = this.getlogdinTokenFromLS();
    if(token.length>0){
      return true;
    }
    else{
      return false;
    }
  }


  addLogedInUserToLS(data:any){
    localStorage.setItem('logdinUser', JSON.stringify(data))
  }
  addlogdintokenToLS(data:any){
    localStorage.setItem('logdintoken', JSON.stringify(data))
  }

  getlogdinTokenFromLS() {
    return JSON.parse(localStorage.getItem('logdintoken')) || [];
  }
  getLogedInUserFromLS() {
    return JSON.parse(localStorage.getItem('logdinUser')) || [];
  }




}

