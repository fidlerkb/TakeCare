import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UsersService } from '../Common/users.service';
import { User } from '../Models/Entitys.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Common/auth.service';
import { Route } from '../../../node_modules/@angular/compiler/src/core';
import { parse } from 'path';
import { ServerService } from '../Common/server.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,
     private userservice : UsersService,
     private authservise:AuthService,
    private server:ServerService) { }



  selectedUser:User = null;

  @ViewChild("frm") signupForm :NgForm;

  ngOnInit() {

  }

  getSignUpedSelectdUser(){

  }
  onlogin(form:NgForm){ 
    let mail = form.value.mail;
    let password = form.value.password;

    this.authservise.loginUser(mail,password)
      .then((res) => {
        this.router.navigate(['']);
    });
  }
  }

  

