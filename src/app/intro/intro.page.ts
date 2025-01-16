import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // importamos el router
import {
  InfiniteScrollCustomEvent,
  IonAvatar,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular'; // importamos el storage
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false,
})
export class IntroPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage, //inyectamos el storage
   ) { 
    addIcons({ heart });

  }

  items: string[] = [];
  ngOnInit() {
    this.generateItems();

  }
  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  finish(){
    console.log('Finish');
    this.storage.set('vilaIntro', true); // GUARDAMOS EN EL STORAGE QUE YA SE HA MOSTRADO LA INTRODUCCIÓN
    this.router.navigateByUrl('/home'); // redireccionamos al home
  }
}
