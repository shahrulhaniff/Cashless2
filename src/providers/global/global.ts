import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  //public mysite : string  = "http://localhost/cashless2/";
  //public baseURI : string  = "http://192.168.43.194/cashless2/"; 
  //public baseURI : string  = "http://localhost/cashless2/";
  public mysite : string  = "https://raxsoft.000webhostapp.com/cashless2/";

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

}
