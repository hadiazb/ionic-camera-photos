import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

import { Post } from '../../interfaces';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public tempImages: string[] = [];
  public imageSrc?: string;
  public post: Post = {
    message: '',
    coords: null,
    position: false,
  };
  public loadingGeo: boolean = false;

  constructor(private postsService: PostsService, private route: Router) {}

  public async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.loadingGeo = false;
      const coords = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;

      this.post.coords = coords;
    } catch (error) {
      this.loadingGeo = false;
      console.error(error);
    }
  }

  public async createPost() {
    const createOk = await this.postsService.createPost(this.post);

    if (createOk) {
      this.post = {
        message: '',
        coords: null,
        position: false,
      };

      this.route.navigateByUrl('/app/tab1');
    }
  }

  public async getGeo() {
    if (!this.post.position) {
      this.post.coords = null;
      this.loadingGeo = false;
      return;
    }
    this.loadingGeo = true;
    await this.getCurrentPosition();
  }

  public onTakePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    const imageUrl = image.webPath;
    this.imageSrc = imageUrl;

    console.log({ image });
  };
}
