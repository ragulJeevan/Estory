import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-my-story',
  standalone: false,
  
  templateUrl: './my-story.component.html',
  styleUrl: './my-story.component.scss'
})
export class MyStoryComponent implements OnInit {
  public stories : any = [];
  public categoryList : any = [];
  public newStoryForm!:FormGroup;
  public isNewStory : Boolean = true;

  public pageNumber:number = 1;
  public pageSize:number = 20;
  public createdBy:number = 1;

  constructor(
    private route : Router,
    private formBuilder : FormBuilder,
       private nativeService:CoreService,
  ){}

  ngOnInit(): void {
    this.getCategory();
    this.newStoryForm = this.formBuilder.group({
      category_id:[null,Validators.required],
      name:[null,Validators.required]
    })
  }

  private getStoryList(){
    const url ='story_filter/';
    const payLoad = {
      "Category": null,
      "created_by":this.createdBy,
      "header": null,
      "is_reviewed": null,
      "is_published": null,
      "page": this.pageNumber,
      "page_size": this.pageSize,
  }
    this.nativeService.post(url,payLoad).subscribe((res:any)=>{
      this.stories = res?.data;
    },((err:any)=>{
      this.stories = [];
    }))
  }

  private getCategory(){
    const url = 'category_detail/';
    this.nativeService.get(url).subscribe((res:any)=>{
      this.categoryList = res?.data;
      this.getStoryList();
    },((err:any)=>{
      
    }));
  }


  navigateTo(path:string){
    this.route.navigate([path]);
  }

  addNewStory(){
    if(this.isNewStory){
      this.isNewStory = false;
      this.stories.unshift({
        id:0,
        header:'',
        isNew:true
      })
    }
  }

  createStory(){
    this.isNewStory = true;
    let value = this.newStoryForm?.value;
    console.log(value);
    this.navigateTo('core/create-story');
  }

}
