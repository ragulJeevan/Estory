import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-avatar',
  imports: [CommonModule],
  templateUrl: './profile-avatar.component.html',
  styleUrl: './profile-avatar.component.scss'
})
export class ProfileAvatarComponent {

  @Input() public p40sImageArgs: string = 'https://fastly.picsum.photos/id/362/536/354.jpg?hmac=80yPo_BYwdjdsODBOssublEURlS5Wqy9qscadE8R0qg';
  @Input() public p40sImageType: string = 'url'; //base64, url


  constructor() { }

}
