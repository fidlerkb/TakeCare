import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'; 
import { HttpModule }   from '@angular/Http';


import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'  
import {SlideshowModule} from 'ng-simple-slideshow';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';
import { RoutsModule } from './app-routs/routs.module';
import { FooterComponent } from './footer/footer.component';
import { CareTakersComponent } from './care-takers/care-takers.component';
import { LoginComponent } from './login/login.component';
import { SigenupComponent } from './sigenup/sigenup.component';
import { CareTakerComponent } from './care-takers/care-taker/care-taker.component';
import { LocationsComponent, } from './care-takers/locations/locations.component';
import { RegisterComponent } from './register/register.component';

import { UsersService } from './Common/users.service';
import { ServerService } from './Common/server.service';
import { AuthService } from './Common/auth.service';
import { UserEditComponent } from './user-edit/user-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationBarComponent,
    HeaderComponent,
    FooterComponent,
    CareTakersComponent,
    LoginComponent,
    SigenupComponent,
    CareTakerComponent,
    LocationsComponent,
    RegisterComponent,
    UserEditComponent,
    
  ],

  imports: [
    BrowserModule,
    AngularSvgIconModule,
    HttpClientModule,
    RoutsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SlideshowModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB2S0sOsid__wXX9H546a3ypIDlTjflMlc',
      libraries: ["places"]
    })
  ],
  
  providers: [UsersService,ServerService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
