import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SenaraiPage } from '../senarai/senarai';
import { DisplayPage } from '../display/display';


@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  scannedCode = null;

  constructor(private barcodeScanner: BarcodeScanner, public navCtrl: NavController, platform :Platform) {

    let backAction = platform.registerBackButtonAction(() => {console.log("second");this.navCtrl.pop;this.navCtrl.setRoot(DisplayPage);backAction();},2)
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  ionViewWillEnter(){this.scanCode();};

  public list : Array<any> = [];
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      if(this.scannedCode  != ""){
        this.list.push({record: {id: barcodeData.text}});
        this.navCtrl.push(SenaraiPage, this.list[0]);
        this.list=[];
      }else{
      
      this.navCtrl.pop;this.navCtrl.setRoot(DisplayPage);
    }
    }, (err) => {
        console.log('Error: ', err);
    });
  }
}