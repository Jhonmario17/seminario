import { Injectable, provideExperimentalCheckNoChangesForDebug } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(credentials: any){
    console.log(credentials, "desde el servicio");
    return new Promise ((accept, reject) => {
      if (
        credentials.email === 'jhon@gmail.com' &&
        credentials.password === '123456'
      ){
        accept('login correcto')
      }else{
        reject('login incorrecto')
      }
    });
  }
}