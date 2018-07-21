import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { UsersService } from '../Common/users.service';
import { User } from '../Models/Entitys.model';
import 'rxjs/Rx';
import { ServerService } from '../Common/server.service';



@Component({
  selector: 'app-care-takers',
  templateUrl: './care-takers.component.html',
  styleUrls: ['./care-takers.component.css']
})
export class CareTakersComponent implements OnInit ,DoCheck{


  users:User[]=[];

 
  constructor(private userService :UsersService 
    ,private router:Router 
    ,private route:ActivatedRoute
    ,private serverservice:ServerService){ }

  ngOnInit() {
    this.users = this.userService.returnCareTakersList();
  }

  ngDoCheck(){
    this.users = this.userService.returnCareTakersList();
  }

  selectCareTakerToWatch(selected:User){
    this.userService.isLocationView = false;
    this.userService.selectedUser.next(selected);
    this.router.navigate(['\caretakers',selected.id]);
  }

  locationView(){
    this.userService.isLocationView = true;
    this.userService.selectedAsLocation.next(this.users)
    this.router.navigate(['bylocation']);
  }


}
