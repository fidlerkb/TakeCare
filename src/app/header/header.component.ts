import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../Common/users.service';

import { User } from '../Models/Entitys.model';
import { AuthService } from '../Common/auth.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logedinUser:User;

  constructor(private router: Router,private userservice:UsersService,private authservice:AuthService) { 
    
  }

  ngOnInit() {
    this.logedinUser = this.userservice.getLogedInUserFromLS();
  }
  logedin(){
    return this.userservice.isLogdIn();
  }

  logout(){
    this.authservice.logOut();
  }

  edituser(){

  }

}
