import { ElementRef, NgZone, OnInit, ViewChild , Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { User } from '../Models/Entitys.model';
import { Guid } from '../../../node_modules/guid-typescript';
import { UsersService } from '../Common/users.service';
import { AuthService } from '../Common/auth.service';


@Component({
  selector: 'sigenup',
  templateUrl: './sigenup.component.html',
  styleUrls: ['./sigenup.component.css']
})
export class SigenupComponent implements OnInit {

  latitude: number;
  longitude: number;
  searchControl: FormControl;
  zoom: number;

  address : string = '';
  validAddress : boolean = false;
  type:string = 'text'
  validMail :string = '';

  @ViewChild("frm") signupForm :NgForm;

  @ViewChild("search") searchElementRef: ElementRef;

  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private userservice :UsersService,
    private router:Router,
    private authservise:AuthService) {}

  ngOnInit() {
    this.initMaps();
  }

  initMaps(){
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
  
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

  showpass(){
    if(this.type=='text')
      this.type='password'
    else if(this.type=='password')
      this.type='text'
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  } 

  cheackUniqueMail(){
    let users:User;
    users = this.userservice.finedUserByMail(this.validMail);
    if(users !=null)
      return false;
    else    
      return true;
  }

  onSubmit(){
    if(this.cheackUniqueMail()){
    let user:User
    user = {
      id : Guid.create().toString(),
      firstName : this.signupForm.value.firstname,
      lastName : this.signupForm.value.lastname,
      password : this.signupForm.value.password,
      email : this.signupForm.value.mail,
      phone : this.signupForm.value.phone,
      address : this.address,
      location : {x:this.latitude,y:this.longitude ,radius:0,draggable:false,lable:''},
      careTaker:null
    }
    this.userservice.addNewUser(user);
    this.authservise.signupUser(user.email,user.password);
    this.router.navigate(['login',user.id]);
  }
  else
    return;
  }
}