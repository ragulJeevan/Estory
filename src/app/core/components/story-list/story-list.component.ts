import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import { StorageService } from '../../../services/storage.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { environment } from '../../../../environments/environment';

const role_id = environment?.role_id;

@Component({
  selector: 'app-story-list',
  standalone: false,

  templateUrl: './story-list.component.html',
  styleUrl: './story-list.component.scss'
})
export class StoryListComponent implements OnInit {

  public storyData: any = []

  public story: any = {};
  public userDetails: any = {};
  public recentStories : any =[];

  constructor(
    private router: Router,
    private p40location: Location,
    private storageService: StorageService,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userDetails = this.storageService.getData('_u');
    if (this.p40location && this.p40location.getState()) {
      let page: any = this.p40location.getState();
      let data: any = page['data'];
      if (data?.length > 0) {
        this.storyData = data;
        this.story = this.storyData[0];
        this.recentStories = this.userDetails?.recent_stories;
        if (!this.recentStories?.includes(this.story?.story_id)) {
          let length = this.userDetails?.recent_stories?.length;
          if (length > 20) {
            this.recentStories.unshift(this.story?.story_id);
          }
          else {
            this.recentStories.pop();
            this.recentStories.unshift(this.story?.story_id);
          }
          this.updateRecent();
        }
        else {

        }
      }
      else {
        this.storyData = [];
        this.story = null;
      }
    }
  }

  previous() {
    let currnetIndex = this.storyData.findIndex((_story: any) => _story?.id === this.story?.id);
    if (currnetIndex !== 0) {
      let index = currnetIndex - 1
      this.story = this.storyData[index];
    }
  }

  next() {
    let currnetIndex = this.storyData.findIndex((_story: any) => _story?.id === this.story?.id);
    let length = this.storyData?.length - 1;
    if (currnetIndex !== length) {
      let index = currnetIndex + 1
      this.story = this.storyData[index];
    }
  }

  updateRecent() {
    const mobile_number = this.storageService?.getData('_n');
    const value = this.userDetails;
    const url = `user_detail/${this.userDetails?.id}/`;
    const payLoad = {
      "name": value?.name,
      "recent_stories": this.recentStories,
      "number": mobile_number,
      "whatsapp_number": value?.number,
      "date_of_birth": value?.date_of_birth,
      "sex": value?.sex,
      "role": role_id,
      "display_image": null,
      "state": value?.state,
      "district": value?.district,
      "taluk": value?.taluk,
      "panchayat": value?.panchayat,
      "address": value?.address,
      "pincode": value?.pincode
    }
    this.authService.put(url, payLoad).subscribe((res: any) => {
      this.storageService.postData('_u', res?.data);
    }, ((err: any) => {

    }))
  }

  navigateBack() {
    this.router.navigate(['/core/stories'])
  }
}
