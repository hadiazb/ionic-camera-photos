import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CreatePost, Post, PostResponse } from '../interfaces';
import { AuthService } from './auth.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private page = 0;
  public newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getPost<T>(pull: boolean = false): Observable<T> {
    if (pull) {
      this.page = 0;
    }
    this.page++;
    return this.http.get<T>(`${apiUrl}/posts`, {
      params: {
        page: this.page,
      },
    });
  }

  public createPost(post: CreatePost): Promise<boolean> {
    const headers = new HttpHeaders({
      'x-token': this.authService.token!,
    });
    return new Promise((resolve) => {
      this.http
        .post<PostResponse>(`${apiUrl}/posts`, post, { headers })
        .subscribe(({ ok, post }) => {
          if (ok) {
            this.newPost.emit(post);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
