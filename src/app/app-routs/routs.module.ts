import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { CareTakersComponent } from '../care-takers/care-takers.component';
import { SigenupComponent } from '../sigenup/sigenup.component';
import { LoginComponent } from '../login/login.component';
import { CareTakerComponent } from '../care-takers/care-taker/care-taker.component';
import { LocationsComponent } from '../care-takers/locations/locations.component';
import { RegisterComponent } from '../register/register.component';
import { UserEditComponent } from '../user-edit/user-edit.component';


const appRouts : Routes= [
  {path:'', component: HomeComponent},
  {path:'caretakers', component:CareTakersComponent},
  {path:'caretakers/:id', component:CareTakerComponent},
  {path:'login', component:LoginComponent},
  {path:'login/:id', component:LoginComponent},
  {path:'sigenup', component:SigenupComponent},
  {path:'bylocation', component:LocationsComponent},
  {path:'register/:id', component:RegisterComponent},
  {path:'useredit', component:UserEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRouts), 
  ],

  exports:[
    RouterModule,
  ],

  declarations: [
    
  ]
})


export class RoutsModule { 
  

}
