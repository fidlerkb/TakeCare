import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UsersService } from '../Common/users.service';
import { User } from '../Models/Entitys.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Common/auth.service';
import { Route } from '../../../node_modules/@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router, private userservice : UsersService,private authservise:AuthService) { }

  selectedUser:User[];
  userName:string = "";
  passWord:string = "";
  @ViewChild("frm") signupForm :NgForm;

  ngOnInit() {
    this.getSignUpedSelectdUser();
    
  }

  getSignUpedSelectdUser(){
    let userId = this.route.snapshot.params['id'];
    this.selectedUser = this.userservice.finedUserById(userId);
    if(this.selectedUser.length>0){
      this.userName = this.selectedUser[0].email;
      this.passWord = this.selectedUser[0].password;
    }
  }

  onlogin(form:NgForm){
    let user:User[];
    let mail = form.value.mail;
    let password = form.value.password;

    user = this.userservice.finedUserByMail(mail);
    
    if(user!=null && form.valid){
      this.authservise.loginUser(mail,password);
      this.userservice.logedInUser.next(user[0]);
      
      this.router.navigate(['']);
    }
  }
}

