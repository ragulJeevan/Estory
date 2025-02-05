import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { StorageService } from '../../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../services/notification.service';

const role_id = environment?.role_id;

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  public registerForm!: FormGroup;
  public userDetails: any = {};

  constructor(
    private formbuilder: FormBuilder,
    public router: Router,
    private commonService: CommonService,
    private storageService: StorageService,
    private nativeService: AuthService,
    private notificationService : NotificationService,
  ) { }

  ngOnInit(): void {

    this.registerForm = this.formbuilder.group({
      name: '',
      number:'',
      whatsapp_number: '',
      dob: '',
      gender: '',
      state: '',
      district: '',
      taluk: '',
      panchayat: '',
      street: '',
      pincode: ''
    })
    this.registerForm?.get('number')?.disable();
    this.userDetails = this.storageService.getData('_u');
    this.getUser()
  }

  getUser() {
    const url = `user_detail/${this.userDetails?.id}/`;
    this.nativeService.get(url).subscribe((res: any) => {
      this.registerForm.patchValue({
        name: res?.data?.name,
        number:res?.data?.number,
        whatsapp_number: res?.data?.whatsapp_number,
        dob: res?.data?.date_of_birth,
        gender: res?.data?.sex,
        state: res?.data?.state,
        district: res?.data?.district,
        taluk: res?.data?.taluk,
        panchayat: res?.data?.panchayat,
        street: res?.data?.address,
        pincode: res?.data?.pincode
      })
    }, ((err: any) => {

    }))
  }

  public preventData(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const isNumber = /^[0-9]$/.test(event.key);
    const isBackspace = event.key === 'Backspace';
    if (!isNumber && !isBackspace || inputElement.value.length >= 10 && !isBackspace) {
      event.preventDefault();
    }
  }

  public preventData1(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const isNumber = /^[0-9]$/.test(event.key);
    const isBackspace = event.key === 'Backspace';
    if (!isNumber && !isBackspace || inputElement.value.length >= 6 && !isBackspace) {
      event.preventDefault();
    }
  }

  public disableInput(event: KeyboardEvent){
    event.preventDefault();
  }

  updateProfile() {
    const value = this.registerForm?.value;
    const url = `user_detail/${this.userDetails?.id}/`;
    // NAME, WHATSAPP NUMBER, DOB, GENDER 
    if(value?.name !== this.userDetails?.name || value?.whatsapp_number !== this.userDetails?.whatsapp_number || value?.dob !== this.userDetails?.date_of_birth || value?.gender !== this.userDetails?.sex){
      const payLoad = {
        "name": value?.name,
        "number": this.userDetails?.number,
        "whatsapp_number": value?.whatsapp_number,
        "date_of_birth": value?.dob,
        "sex": value?.gender,
        "role": role_id,
        "display_image": null,
        "state": value?.state,
        "district": value?.district,
        "taluk": value?.taluk,
        "panchayat": value?.panchayat,
        "address": value?.street,
        "pincode": value?.pincode
      }
      this.nativeService.put(url, payLoad).subscribe((res: any) => {
        this.storageService.postData('_u',res?.data);
        this.notificationService.showMessage(res?.message,'Success');
      }, ((err: any) => {
  
      }))
    }
    else{
      this.notificationService.showMessage('No Changes detected','Info');
    }
  }

  Logout() {
    this.storageService.clearAll();
    this.commonService.setLogin(false);
    this.router.navigate(['/auth/login']);
  }

}
