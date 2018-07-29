import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { User } from '../../Models/Entitys.model';
import { UsersService } from '../../Common/users.service';
import { Subscriber, Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-care-taker',
  templateUrl: './care-taker.component.html',
  styleUrls: ['./care-taker.component.css']
})
export class CareTakerComponent implements OnInit , OnDestroy {

  selectedUser:User;
  observedUser:User;
  paramsSubscription: Subscription;

  constructor(private route:ActivatedRoute,private userservice : UsersService) {
   }

  ngOnInit() {
      this.onSelection();
      this.userservice.selectedUser.subscribe(
        (user)=>this.observedUser = user
      );
    }

    onSelection(){
      let userId = this.route.snapshot.params['id'];
      this.selectedUser = this.userservice.finedUserById(userId);
      this.paramsSubscription = this.route.params.subscribe(
        (param:Params)=>userId = param['id']
      );
    }

    ngOnDestroy(){
      // this.paramsSubscription.unsubscribe();
    }
      
  }


