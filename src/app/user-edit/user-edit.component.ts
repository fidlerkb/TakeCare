import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from '../Common/users.service';
import { User } from '../Models/Entitys.model';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AuthService } from '../Common/auth.service';


@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  logedinUser:User;
  editMode:boolean = false;

  latitude: number;
  longitude: number;
  searchControl: FormControl;
  zoom: number;

  address : string = '';
  validAddress : boolean = false;
  type:string = 'text'


  @ViewChild("search") searchElementRef: ElementRef;

  constructor(private userservice:UsersService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router:Router,
    private authservise:AuthService) { }


  ngOnInit() {
    this.logedinUser = this.userservice.getLogedInUserFromLS();
    this.initMaps();
  }

  initMaps(){
    //set google maps defaults
    this.zoom = 4;
    this.latitude = this.logedinUser.location.x;
    this.longitude = this.logedinUser.location.y;
  
    //create search FormControl
    this.searchControl = new FormControl();
  
    //set current position
    this.setCurrentPosition();
  
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          
          this.address = place.formatted_address;
          this.validAddress = true;
          console.log(this.address);

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
  
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
      
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.logedinUser.location.x;
        this.longitude = this.logedinUser.location.y;
        this.zoom = 12;
      });
    }
  } 

  enableEdit(){
    this.editMode = !this.editMode;
    console.log(this.editMode);
  }



}
