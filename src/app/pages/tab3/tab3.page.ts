import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';

import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public user: User = {};

  constructor(
    private authService: AuthService,
    private uiServiceService: UiServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  public logout() {
    console.log('hola');
  }

  public async onUpdateUser(fUpdateUser: NgForm) {
    if (!fUpdateUser.valid) return;

    try {
      const validFlag = await this.authService.updateUser(this.user);

      this.handleUpdate(validFlag, 'Usuario Actualizado');
    } catch (error) {
      console.error(error);
    }
  }

  private handleUpdate(flag: boolean, message: string) {
    if (flag) {
      return this.uiServiceService.toastInfo(message);
    }

    return this.uiServiceService.toastInfo('Hay un error');
  }
}
