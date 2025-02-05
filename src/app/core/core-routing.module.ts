import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesComponent } from './components/stories/stories.component';
import { RecentStoryComponent } from './components/recent-story/recent-story.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { MyStoryComponent } from './components/my-story/my-story.component';
import { CreateStoryComponent } from './components/create-story/create-story.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path:'stories',component:StoriesComponent,canActivate:[authGuard]},
  {path:'recent-story',component:RecentStoryComponent,canActivate:[authGuard]},
  {path:'story-list',component:StoryListComponent,canActivate:[authGuard]},
  {path:'my-story',component:MyStoryComponent,canActivate:[authGuard]},
  {path:'create-story',component:CreateStoryComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
