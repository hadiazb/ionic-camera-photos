import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { Post, PostsResponse } from 'src/app/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  ionInfiniteScroll?: IonInfiniteScroll;
  @ViewChild(IonRefresher)
  ionRefresher?: IonRefresher;

  public posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getPost();
    this.updatePostsList();
  }

  public updatePostsList() {
    this.postsService.newPost.subscribe((post) => {
      this.posts.unshift(post);
    });
  }

  public getPost(
    callback?: (postsResponse: PostsResponse) => void,
    pull: boolean = false
  ) {
    this.postsService
      .getPost<PostsResponse>(pull)
      .subscribe(({ posts, ...rest }) => {
        this.posts.push(...posts);

        if (callback) {
          callback({ posts, ...rest });
        }
      });
  }

  public onIonInfinite(event: Event) {
    this.getPost(({ posts }) => {
      if (!this.ionInfiniteScroll) {
        return;
      }
      this.ionInfiniteScroll.complete();
      if (posts.length === 0) {
        this.ionInfiniteScroll.disabled = true;
      }
    });
  }

  public onRefresh(event: Event) {
    this.posts = [];
    this.getPost(({ posts }) => {
      if (!this.ionRefresher) {
        return;
      }
      this.ionRefresher.complete();
      if (posts.length === 0) {
        this.ionRefresher.disabled = true;
      }
    }, true);
  }
}
