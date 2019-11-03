import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

 async login(form) {
   console.log(form);
   let resp = await this.authService.login(form.value)
  }

}
