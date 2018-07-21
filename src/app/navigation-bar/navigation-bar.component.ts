import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../Common/users.service';
import { eRoll } from '../Models/Entitys.model';


@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router: Router,private userservice:UsersService) { }

  ngOnInit() {
  }

  selectProffesion(rollnum:number){
    if(rollnum == 1)
      this.userservice.proffesion=eRoll.babysitter;
    if(rollnum == 2)
      this.userservice.proffesion=eRoll.nanny;
    if(rollnum == 3)
      this.userservice.proffesion=eRoll.dogsitter;
  }
 

}
