import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-recent-story',
  standalone: false,

  templateUrl: './recent-story.component.html',
  styleUrl: './recent-story.component.scss'
})
export class RecentStoryComponent {


  public stories: any = [];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public userDetails : any ={};

  constructor(
    private route: Router,
    private nativeService: CoreService,
    private storageService : StorageService,
  ) { }

  ngOnInit(): void {
    this.userDetails = this.storageService?.getData('_u');
    this.getStoryList();
  }

  public getStoryList() {
    const url = 'stories-by-ids/';
    const storyID = this.userDetails?.recent_stories;
    const payLoad = {
      "id": storyID
    }
    this.nativeService.post(url, payLoad).subscribe((res: any) => {
      this.stories = res?.data;
    }, ((err: any) => {
      this.stories = [];
    }))
  }

  navigateTo(path: string,story:any) {
    this.route.navigateByUrl(path,{ state: { data: story} })
  }

}
