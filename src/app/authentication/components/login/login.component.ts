import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public otpForm!: FormGroup;
  public isOtp: Boolean = false;
  public isNew:Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private commonService:CommonService,
    private router:Router,
    private nativeService : AuthService,
    private storageService : StorageService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mobile_number: [null, Validators.required]
    })

    this.otpForm = this.formBuilder.group({
      otp_number: [null, Validators.required]
    })
  }

  public preventData(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const isNumber = /^[0-9]$/.test(event.key);
    const isBackspace = event.key === 'Backspace';

    // If input length is 10 and the key is not backspace, prevent adding more characters
    if (!isNumber && !isBackspace || inputElement.value.length >= 10 && !isBackspace) {
      event.preventDefault(); // Prevent any invalid keypress
    }
  }

  public preventData1(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const isNumber = /^[0-9]$/.test(event.key);
    const isBackspace = event.key === 'Backspace';
    // If input length is 10 and the key is not backspace, prevent adding more characters
    if (!isNumber && !isBackspace || inputElement.value.length >= 6 && !isBackspace) {
      event.preventDefault(); // Prevent any invalid keypress
    }
  }

  public preventPaste(event: ClipboardEvent): void {
    const pastedData: any = event.clipboardData?.getData('text');
    if (!/^[0-9]+$/.test(pastedData) || pastedData.length > 10) {
      event.preventDefault();
    }
  }

  sendOtP() {
    const form :any = this.loginForm?.value;
    const string = form?.mobile_number?.toString();
    if (this.loginForm?.valid && string?.length === 10) {
     const url = 'check_user/';
     const payLoad ={
      'number':form?.mobile_number
     }
     this.nativeService.post(url,payLoad).subscribe((res:any)=>{
      if(res?.status){
        this.storageService.postData('_u',res?.data);
        this.isNew = false;
      }
      else{
        this.isNew = true;
      }
      this.storageService.postData('_n',form?.mobile_number);
      this.isOtp = true;
     })
    }
  }

  login() {
    let form = this.otpForm?.value;
    let string = form?.otp_number?.toString();
    if (this.loginForm?.valid && string?.length === 6) {
      this.isNew ? this.commonService.setLogin(true) :  this.commonService.setLogin(false);
      this.isNew ? this.router.navigate(['/auth/register']) : this.router.navigate(['/core/stories']);
    }
  }

}
