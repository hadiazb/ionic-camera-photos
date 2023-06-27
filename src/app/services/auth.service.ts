import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import { environment } from '../../environments/environment';
import { LoginResponse, User, UserResponse } from '../interfaces';
import { NavController } from '@ionic/angular';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string | null = null;
  public message: string | null = null;
  public messageRg: string | null = null;
  public user: User = {};

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  public onLogin(email: string, password: string): Promise<boolean> {
    const data = { email, password };
    return new Promise((resolve) => {
      this.http
        .post<LoginResponse>(`${apiUrl}/users/login`, data)
        .subscribe(({ ok, token, message }) => {
          if (ok) {
            this.saveToken(token);
            resolve(true);
          } else {
            this.message = message;
            this.handleLoginErr();
            resolve(false);
          }
        });
    });
  }

  public onRegister(user: User): Promise<boolean> {
    return new Promise((resolve) => {
      this.http
        .post<LoginResponse>(`${apiUrl}/users/create`, user)
        .subscribe(({ ok, token, message }) => {
          if (ok) {
            this.saveToken(token);
            resolve(true);
          } else {
            this.messageRg = message;
            this.handleLoginErr();
            resolve(false);
          }
        });
    });
  }

  private async saveToken(token: string) {
    this.token = token;
    await Preferences.set({
      key: 'token',
      value: this.token,
    });
  }

  public async getUserToken() {
    try {
      const { value: token } =
        (await Preferences.get({
          key: 'token',
        })) || null;
      this.token = token;
    } catch (error) {
      console.error(error);
    }
  }

  public async handleLoginErr() {
    try {
      await Preferences.remove({
        key: 'token',
      });
      this.token = null;
    } catch (error) {
      console.error(error);
    }
  }

  public async verifyToken(): Promise<boolean> {
    await this.getUserToken();
    if (!this.token) {
      this.navCtrl.navigateRoot('/app/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token!,
      });

      this.http
        .get<UserResponse>(`${apiUrl}/users`, { headers })
        .subscribe(({ ok, user }) => {
          if (!ok) {
            this.navCtrl.navigateForward('/app/login');
            return resolve(false);
          }
          this.user = user;
          return resolve(true);
        });
    });
  }

  public getUser() {
    if (!this.user._id) {
      this.verifyToken();
    }
    return { ...this.user };
  }

  public updateUser(user: User): Promise<boolean> {
    const headers = new HttpHeaders({
      'x-token': this.token!,
    });

    return new Promise((resolve) => {
      this.http
        .put<LoginResponse>(`${apiUrl}/users/update`, user, { headers })
        .subscribe(({ ok, token }) => {
          if (ok) {
            this.saveToken(token);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
