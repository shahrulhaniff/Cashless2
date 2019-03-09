import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  id_kodtransaksi : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id_kodtransaksi = navParams.get('data'); 
  }

  ionViewDidLoad() {
  if (this.navParams.get("record")) {
    //this.selectEntry(this.navParams.get("record"));
    console.log('Data: ', this.navParams.get("record"));
  }
  }
  

}
