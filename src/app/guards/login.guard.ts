import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate{
  constructor(private storage: Storage, private navCtrl: NavController){}
  async canActivate(){
    const isUserloggedIn = await this.storage.get('isUserloggedIn');
    if(isUserloggedIn){
      return true;
    }else{
      this.navCtrl.navigateRoot('/login');
      return false;
    }
  }
}
