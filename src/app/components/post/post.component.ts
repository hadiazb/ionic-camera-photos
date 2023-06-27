import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = {};

  public images = [
    '/assets/perro-1.jpg',
    '/assets/perro-2.jpg',
    '/assets/perro-3.jpg',
  ];

  constructor() {}

  ngOnInit() {}
}
