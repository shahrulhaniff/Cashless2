import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  /** NOTA: yang function toFixed(2) tu error bila guna host online */

  //public mysite : string  = "http://192.168.43.194/cashless2/app/"; 
  //public mysite : string  = "http://localhost/cashweb/app/";
  public mysite : string  = "https://cashless123.000webhostapp.com/app/";
  //public mysite : string  = "https://myraxsoft.com/cashless2/app/";

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

}