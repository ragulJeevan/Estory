import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProfileAvatarComponent } from './components/profile-avatar/profile-avatar.component';

import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CommonService } from './services/common.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from './services/storage.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "./components/loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ProfileAvatarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  public header : string = 'EStories';

  public routes : any = [
    {
      route_name:'Recent Story',
      route_url:'core/recent-story',
      image:'https://fastly.picsum.photos/id/362/536/354.jpg?hmac=80yPo_BYwdjdsODBOssublEURlS5Wqy9qscadE8R0qg'
    },
    {
      route_name:'Stories',
      route_url:'core/stories',
      image:'https://fastly.picsum.photos/id/362/536/354.jpg?hmac=80yPo_BYwdjdsODBOssublEURlS5Wqy9qscadE8R0qg'
    },
    {
      route_name:'My Story',
      route_url:'core/my-story',
      image:'https://fastly.picsum.photos/id/362/536/354.jpg?hmac=80yPo_BYwdjdsODBOssublEURlS5Wqy9qscadE8R0qg'
    },
    {
      route_name:'Profile',
      route_url:'auth/profile',
      image:'https://fastly.picsum.photos/id/362/536/354.jpg?hmac=80yPo_BYwdjdsODBOssublEURlS5Wqy9qscadE8R0qg'
    }
  ]
  public isLoggedIn : boolean = true;
  
  constructor(
    private route : Router,
    private commonService:CommonService,
    private storageService:StorageService
  ){}

  ngOnInit(): void {
    this.header = this.routes[1]?.route_name;
    this.commonService.getLogin().subscribe((res:any)=> {
      const data = this.storageService.getData('_u');
      if((data && data?.number) || res ){
        this.isLoggedIn = true;
      }
      else{
        this.isLoggedIn = false;
      }
    });
  }

  public navigateTo(data:any){
    this.header=data?.route_name
    this.route.navigate([data?.route_url]);
  }

}
