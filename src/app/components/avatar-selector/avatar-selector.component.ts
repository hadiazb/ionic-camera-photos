import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  @Output() avatarSelect = new EventEmitter<string>();
  @Input() avatar: string = 'av-1.png';
  public avatars = [
    {
      img: 'av-1.png',
      select: true,
    },
    {
      img: 'av-2.png',
      select: false,
    },
    {
      img: 'av-3.png',
      select: false,
    },
    {
      img: 'av-4.png',
      select: false,
    },
    {
      img: 'av-5.png',
      select: false,
    },
    {
      img: 'av-6.png',
      select: false,
    },
    {
      img: 'av-7.png',
      select: false,
    },
    {
      img: 'av-8.png',
      select: false,
    },
  ];
  constructor() {}

  ngOnInit() {
    this.avatars.forEach((av) => (av.select = false));
    this.avatars.forEach((av) => {
      if (av.img === this.avatar) {
        av.select = true;
        return;
      }
    });
  }

  public onSelectAvatar(avatar: { img: string; select: boolean }) {
    this.avatars.forEach((av) => (av.select = false));
    avatar.select = true;

    this.avatarSelect.emit(avatar.img);
  }
}
