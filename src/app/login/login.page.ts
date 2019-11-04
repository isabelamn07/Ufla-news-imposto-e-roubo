import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // private loggedUser: User = {
  //   email: '',
  //   password: ''
  // };

  private formGroup: FormGroup;

  constructor(private authService: AuthService,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController) {

    this.formGroup = formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required, Validators.email
      ])],
      'passwd': [null, Validators.compose([
        Validators.required, Validators.minLength(6)
      ])]
    });
  }

  ngOnInit() {

  }

  async login() {
    console.log(this.formGroup.value);

    let loading = await this.loadingCtrl.create({
      message: 'Efetuando login... aguarde',
      duration: 2000
    });
    let toast = await this.toastCtrl.create({
      message: "E-mail ou senha incorretos!",
      duration: 2000,
      color: "danger"
    });

    loading.present();
    setTimeout(() => {
      this.authService.login(this.formGroup.value)
        .catch((err) => {
          console.log(err);
          toast.present();
        });
      }, 2000)

      return;
    }
   
}


