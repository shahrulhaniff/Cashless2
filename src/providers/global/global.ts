import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  //public mysite : string  = "http://192.168.43.194/cashweb/app/"; 
  public mysite : string  = "http://localhost/cashweb/app/";
  //public mysite : string  = "https://cashless1234.000webhostapp.com/app/";

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

}