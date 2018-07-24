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

  Users:Observable<User[]>= this.server.getDataFromDBAsync();

  selectedUser:User = null;
  userName:string = "";
  passWord:string = "";
  @ViewChild("frm") signupForm :NgForm;

  ngOnInit() {
    this.getSignUpedSelectdUser();
    this.userservice.getDataFromServer();
  }

  getSignUpedSelectdUser(){
    debugger;
    let userId:string = this.route.snapshot.params['id'];
    let LSuser =  this.userservice.getDataFromLS()
    if(userId != null){
      this.selectedUser = this.userservice.finedUserById(userId);
      this.userservice.addUserToDB(this.selectedUser[0]);
    }
    else if(LSuser != null){
      this.selectedUser = LSuser;
      this.userservice.addUserToDB(this.selectedUser[0]);
    }
    console.log(this.selectedUser);
  }


    onlogin(form:NgForm){ 
      debugger;
      let mail = form.value.mail;
      let password = form.value.password;
      this.authservise.loginUser(mail,password);
      if(this.selectedUser == null){
        this.selectedUser = this.userservice.finedUserByMail(mail);
        console.log(this.selectedUser);
        this.userservice.logedInUser.next(this.selectedUser[0]);
      }
      this.router.navigate(['']);
      }
  
  }

  

