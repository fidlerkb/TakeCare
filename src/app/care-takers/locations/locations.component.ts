import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../Models/Entitys.model';
import { UsersService } from '../../Common/users.service';
import { ISubscription, Subscription } from "rxjs/Subscription";
import 'rxjs/Rx';
import { Router } from '../../../../node_modules/@angular/router';



@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit , OnDestroy{

  subscription : Subscription;
  selectedUser : User[]=[];
  usersSubscription :Subscription;

  constructor(public userservice:UsersService,private router: Router) { 
    
  }

  ngOnInit() {
    this.selectLocationView();
  }

  selectLocationView(){
    if(this.userservice.isLocationView)
        this.usersSubscription =this.userservice.selectedAsLocation.subscribe(
        (user)=>this.selectedUser = user
      );
    if(!this.userservice.isLocationView)
    this.usersSubscription =this.userservice.selectedUser.subscribe(
      (user)=> 
      this.selectedUser.push(user)
    );
  } 
  backToListView(){
    this.router.navigate(['/caretakers']);
  }

  ngOnDestroy(){
    this.usersSubscription.unsubscribe();
  }

  }

