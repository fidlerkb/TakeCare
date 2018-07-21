import { Guid } from "guid-typescript";

export class User{

    constructor(_firstName:string,_lastName:string,_password:string,_address:string,_email:string,_phone:string,_location:Location,_careTaker:CareTaker)
    {
        this.id=Guid.create().toString();
        this.firstName=_firstName;
        this.lastName=_lastName;
        this.password=_password;
        this.address = _address;
        this.email=_email;
        this.phone=_phone;
        this.location=_location;
        this.careTaker=_careTaker;
    }

    id:string;
    firstName:string;
    lastName:string; 
    password:string;
    email:string;
    phone:string;
    address:string;
    location:Location;
    careTaker:CareTaker;
}


export class CareTaker{

    constructor(_photo:string, _ratingark:number,_ratincount:number,_age:number,_reviewes:reviewe[],_available:boolean,_roll:eRoll,_sallery:sallery,_about:string){
        this.photo=_photo;
        this.age = _age;
        this.ratingMark=_ratingark;
        this.reviewes=_reviewes;
        this.available=_available;
        this.roll=_roll;
        this.requestedSallery = _sallery;
        this.about=_about;
    }

    photo:string;
    age:number;
    ratingMark:number;
    ratingCount:number;
    reviewes:reviewe[];
    available:boolean;
    roll:eRoll;
    requestedSallery:sallery;
    about:string;

    
};


export enum eRoll{
    "babysitter",
    "nanny",
    "dogsitter"
}
export class Location{
    x:number;
    y:number;
    radius:number;
    draggable: false;
    lable:string;

    constructor(_x:number,_y:number,_r:number){
        this.x=_x;
        this.y=_y;
        this.radius=_r;
    }
}
export class reviewe{
    reviewewWriter:User;
    reviewewMsg:string;


    constructor(_reviewewWriter:User,_reviewewMsg:string){
        this.reviewewWriter = _reviewewWriter;
        this.reviewewMsg = _reviewewMsg;
    }
}

export class sallery{
    paymentFrequancy:string;
    amount:number;
    currency:string;
}