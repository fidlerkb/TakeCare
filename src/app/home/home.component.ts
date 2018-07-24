import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { User, eRoll } from '../Models/Entitys.model';
import { UsersService } from '../Common/users.service';


@Component({
  selector: 'homePage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users:User[] = [];
  topUser:User[] = [];
  imgUrls = [];
    

  constructor(private router:Router,private userservice:UsersService) { 

  }

  ngOnInit() {
    
    this.topUser.push(this.getTopBabysitter());
    this.topUser.push(this.getTopNanny());
    this.topUser.push(this.getTopDogSitter());
    this.imgUrls = [
      {url:this.topUser[0].careTaker.photo, caption: "Rate" + ' ' + this.topUser[0].careTaker.ratingMark  + ' ' + "BabtSitter" + ' ' + this.topUser[0].firstName + ' ' + this.topUser[0].lastName},
      {url:this.topUser[1].careTaker.photo, caption: "Rate" + ' ' + this.topUser[1].careTaker.ratingMark  + ' ' + "Nanny" + ' ' + this.topUser[1].firstName + ' ' + this.topUser[1].lastName},
      {url:this.topUser[2].careTaker.photo, caption: "Rate" + ' ' + this.topUser[2].careTaker.ratingMark  + ' ' + "DogSitter" + ' ' +this.topUser[2].firstName + ' ' + this.topUser[2].lastName},
    ];
  }

  loginToSite(){
    this.router.navigate(['/login']);
  }
  registerToSite(){
    this.router.navigate(['/register']);
  }

  getTopBabysitter(){
    let id = this.userservice.returnTopCareTaker(eRoll.babysitter);
    return  this.userservice.Users.find((user)=>user.id==id);
  }
  getTopNanny(){
    let id = this.userservice.returnTopCareTaker(eRoll.nanny);
    return this.userservice.Users.find((user)=>user.id==id);
  }
  getTopDogSitter(){
    let id = this.userservice.returnTopCareTaker(eRoll.dogsitter);
    return this.userservice.Users.find((user)=>user.id==id);
  }

}
