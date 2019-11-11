import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Inscrições',
      url: '/subscription',
      icon: 'bookmarks'
    }
  ];

  public isLoggedIn = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private route: ActivatedRoute
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.authState.subscribe(state => {
        if (state) {
          this.isLoggedIn = true;
          this.router.navigate(['home']);
        } else {
          let actualRoute: string
           this.route.url.subscribe(subs => {
            console.log(subs);
          })
          if (!(this.router.url === '/'))  {
            this.router.navigate(['login']);
          }
        }
      })
    });
  }

  async logout() {
    this.isLoggedIn = false;
    let toast = await this.toastCtrl.create({
      message: "Logout executado com sucesso!",
      duration: 1500,
      color: "success",
      position: "bottom"
    })
    toast.present();
    return await this.authService.logout();
  }
}
