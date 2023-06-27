import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SwiperContainer } from 'swiper/element';

import { AuthService } from '../../services/auth.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('swiper', { static: true })
  swiperRef?: ElementRef<SwiperContainer>;

  public loginUser = {
    email: 'hadiazb@gmail.com',
    password: '12345',
  };

  public registerUser = {
    name: 'Hugo Andres Diaz Bernal',
    email: 'hadiazb@gmail.com',
    password: '12345',
    avatar: 'av-1.png',
  };

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private uiServiceService: UiServiceService
  ) {}

  public async onLogin(fLogin: NgForm) {
    if (!fLogin.valid) return;

    try {
      const validFlag = await this.authService.onLogin(
        this.loginUser.email,
        this.loginUser.password
      );
      this.handleNavigation(validFlag, 'Usuario o contraseña erronea');
    } catch (error) {
      console.error(error);
    }
  }

  private handleNavigation(
    flag: boolean,
    message: string = 'Ha ocurrido un error'
  ) {
    if (!flag) {
      return this.uiServiceService.alertInfo(
        this.authService.message || message
      );
    }

    return this.navCtrl.navigateForward('/app/tab1', { animated: true });
  }

  public async onRegister(fRegister: NgForm) {
    if (!fRegister.valid) return;

    try {
      const validFlag = await this.authService.onRegister({
        ...this.registerUser,
      });
      this.handleNavigation(validFlag, 'El email ya fue registrado');
    } catch (error) {
      console.error(error);
    }
  }

  public onEntryRegister() {
    if (!this.swiperRef) {
      return;
    }
    this.swiperRef.nativeElement.swiper.slideTo(1);
  }

  public onEntryLogin() {
    if (!this.swiperRef) {
      return;
    }
    this.swiperRef.nativeElement.swiper.slideTo(0);
  }
}
