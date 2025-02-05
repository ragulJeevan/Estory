import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { StoriesComponent } from './components/stories/stories.component';
import { RecentStoryComponent } from './components/recent-story/recent-story.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { ProfileAvatarComponent } from "../components/profile-avatar/profile-avatar.component";
import { MyStoryComponent } from './components/my-story/my-story.component';
import { CreateStoryComponent } from './components/create-story/create-story.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StoriesComponent,
    RecentStoryComponent,
    StoryListComponent,
    MyStoryComponent,
    CreateStoryComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileAvatarComponent
],
  exports:[
    StoriesComponent
  ]
})
export class CoreModule { }
