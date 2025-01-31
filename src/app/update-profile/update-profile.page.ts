import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { PostService } from '../services/post.service';

defineCustomElements(window);

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
  standalone: false
})
export class UpdateProfilePage implements OnInit {
  updateUserForm: FormGroup;
    errorMessage: any;
    FormErros = {
      name: [
        { type: 'required', message: 'El nombre es obligatorio' },
      ],
      last_name:[
        { type: 'required', message: 'El apellido es obligatorio' },
      ],
    }
  user_data: any = {
    username: '',
    name: '',
    image: '',
    last_name: ''
  }
  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private navCrtl: NavController
  ) { 
    this.updateUserForm = this.formBuilder.group({
          name: new FormControl('', Validators.compose([
            Validators.required
          ])),
          last_name: new FormControl('', Validators.compose([
            Validators.required
          ])),
        })
  }

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
  cancel() {
    this.modalController.dismiss()
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
    console.log("actualizar");
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

  updateUser(formValues: any){
    
    this.user_data.name = formValues.name;
    this.user_data.last_name = formValues.last_name;

    console.log("DATOS A ACTUALIZAR");
    console.log(this.user_data);
    this.userService.UpdateDataUser(this.user_data).then(
      (data) => {
        console.log(data);
        this.userService.userUpdate.emit(data);
        this.updateUserForm.reset();
        this.modalController.dismiss({null: null});
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  cancela(){
    console.log("cancelado");
    this.modalController.dismiss({null: null});
  }
}