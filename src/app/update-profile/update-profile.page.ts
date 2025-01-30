import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
  standalone: false
})
export class UpdateProfilePage implements OnInit {
  user_data: any = {
    name: '',
    last_name: '',
    image: '',

  }
  constructor(
    private modalController: ModalController,
    private userService: UserService,

  ) { }

  ngOnInit() {
  }
  async updateuser(){
    console.log("Actualizando")
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
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
