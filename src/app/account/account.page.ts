import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UpdateProfilePage } from '../update-profile/update-profile.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})

export class AccountPage implements OnInit {
  user_data: any = {
    username: '',
    name: '',
    email: '',
    image: '',
    followee: [],
    followers: []
  }
  isLoading: boolean = false;
  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private storage: Storage,
    private alertController: AlertController,
  ) { }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    this.userService.getUser(user.id).then(
      (data: any) =>{
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch(
      (error) =>{
        console.log(error);
      }
    )
  }

  async takePhoto(source: CameraSource){
    console.log('take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality:100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async update(){
    this.isLoading = true;
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
        this.isLoading = false;
      }
    ).catch(
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    )
  }

  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿De dónde desea obtener la imagen?",
      buttons:[
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }
  
  async updateProfile(){
    console.log("Actualizar perfil")
        const modal = await this.modalController.create({
          component: UpdateProfilePage,
          componentProps:{}
        });
        return await modal.present();
  }

}
