import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-story',
  standalone: false,
  
  templateUrl: './create-story.component.html',
  styleUrl: './create-story.component.scss'
})
export class CreateStoryComponent implements OnInit{


  public storiesFormGroup! : FormGroup;
  public storyFormArray!:FormArray;

  public singleStory!:FormGroup;
  public currentIndex:number = 0;

  constructor(
    public formBuilder : FormBuilder,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.storyFormArray = this.formBuilder.array([]);
    this.storiesFormGroup = this.formBuilder.group({
      storyArray : this.storyFormArray
    });

    this.singleStory = this.formBuilder.group({
      heading:[null,Validators.required],
      content:[null,Validators.required],
      isNew:true,
    })
  }

  addForm(formGroup:any){
    this.storyFormArray.push(formGroup);
  }

  next(){
    const value = this.singleStory?.value;
    if(value?.isNew){
      const formGroup = this.formBuilder.group({
        heading:value?.heading,
        content:value?.content,
        isNew:value?.isNew
      })
      this.addForm(formGroup);
      this.currentIndex++;
      this.singleStory.reset();
      this.singleStory.patchValue({
        isNew:true
      })
    }
    else{
      const formValue = this.storyFormArray?.controls[this.currentIndex];
      formValue?.setValue(value);
      this.currentIndex++;
      let index = this.storyFormArray?.value?.length;
      if(this.currentIndex === index){
        this.singleStory.reset();
        this.singleStory.patchValue({
          isNew:true
        })
      }
      else{
        const formValue = this.storyFormArray?.value[this.currentIndex];
        this.singleStory.patchValue({
          heading:formValue?.heading,
          content:formValue?.content,
          isNew:false
        })
      }
    }
    
  }

  prev(){
    let value = this.storyFormArray?.value;
    if(this.currentIndex !== 0){
      this.currentIndex--;
      this.singleStory.patchValue({
        heading:value[this.currentIndex]?.heading,
        content:value[this.currentIndex]?.content,
        isNew:false,
      })
    }
  }

  save(){
    let storyArray = this.storyFormArray?.value;
    this.storyFormArray?.clear();
    this.storiesFormGroup?.reset();
    this.router.navigate(['/core/my-story']);
    this.navigateTo('/core/my-story');
  }

  navigateTo(path:string){
    this.router.navigate([path]);
  }

}
