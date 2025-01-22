import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // importamos el router
import { Storage } from '@ionic/storage-angular'; // importamos el storage
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false, // agregar lineal al crear intro
})
export class IntroPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage, //inyectamos el storage
   ){}
   ngOnInit() {
   }
  finish(){
    console.log('Finish');
    this.storage.set('vilaIntro', true); // GUARDAMOS EN EL STORAGE QUE YA SE HA MOSTRADO LA INTRODUCCIÓN
    this.router.navigateByUrl('/menu/home'); // redireccionamos al home
  }
}
