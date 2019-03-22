import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  //public mysite : string  = "http://192.168.43.194/cashless2/app/"; 
  public mysite : string  = "http://localhost/cashless2/app/";
  //public mysite : string  = "https://raxsoft.000webhostapp.com/cashless2/app/";
  //public mysite : string  = "https://myraxsoft.com/cashless2/app/";

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

}