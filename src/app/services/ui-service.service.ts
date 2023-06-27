import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiServiceService {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  async alertInfo(message: string) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async toastInfo(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
    });

    await toast.present();
  }
}
