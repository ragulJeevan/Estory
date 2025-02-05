import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { NotificationService } from '../../../services/notification.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-stories',
  standalone: false,
  
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss'
})
export class StoriesComponent implements OnInit{

  public stories : any = [];
  public pageNumber:number = 1;
  public pageSize:number = 20;

  constructor(
    private route : Router,
    private nativeService:CoreService,

  ){}

  ngOnInit(): void {
    this.getStoryList();

  }

  public getStoryList(){
    const url ='story_filter/';
    const payLoad = {
      "Category": null,
      "created_by":null,
      "header": null,
      "is_reviewed": null,
      "is_published": null,
      "page": this.pageNumber,
      "page_size": this.pageSize,
  }
    this.nativeService.post(url,payLoad).subscribe((res:any)=>{
      this.stories = res?.data;
    },((err:any)=>{

    }))
  }

  navigateTo(path:string,story:any){
    this.route.navigateByUrl(path,{ state: { data: story} })
  }


}
