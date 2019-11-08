import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private registerUser: User = {
    email: '',
    username: '',
    password: '',
  };

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router) {

    this.formGroup = formBuilder.group({
      'email': [this.registerUser.email, Validators.compose([
        Validators.required, Validators.email
      ])],
      'username': [this.registerUser.username, Validators.compose([
        Validators.required, Validators.minLength(3)
      ])],
      'password': [this.registerUser.password, Validators.compose([
        Validators.required, Validators.minLength(6)
      ])],
      'confirmPassword': ['']
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  async showSuccessMessage() {
    let toast = await this.toastCtrl.create({
      color: "success",
      duration: 1500,
      message: "Usuário criado com sucesso!",
      header: "Sucesso!"
    })

    await toast.present();
  }

  async showErrorMessage() {
    let toast = await this.toastCtrl.create({
      color: "danger",
      duration: 1500,
      message: "Ocorreu um erro durante o cadastro do usuário, tente novamente mais tarde",
      header: "Erro!"
    })

    await toast.present();
  }

  async register() {
    let registeredUser = this.formGroup.value;
    delete registeredUser.confirmPassword;

    let loading = await this.loadingCtrl.create({
      message: 'Cadastrando usuário... aguarde',
      duration: 2000
    });


    loading.present();
    setTimeout(() => {
      this.authService.register(registeredUser)
      .then(resp => {
        this.showSuccessMessage();
        this.router.navigate(['login']);
      })
        .catch((err) => {
          this.showErrorMessage();
          console.log(err);
          return;
        });
    }, 2000)

    
    return;
  }


}
