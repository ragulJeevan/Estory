import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, EMPTY, forkJoin, tap } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../services/storage.service';

const role_id = environment.role_id;

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  public registerForm!:FormGroup;
  public isAgreement : Boolean = false;
  public agreementList : any = [];

  public districtList : any = [];
  public talukList : any = [];
  public panchayatList : any = [];

  public stateData:any=[];
  public districtData : any = [];
  public talukData : any = [];
  public panchayatData : any = [];

  constructor(
    private formbuilder : FormBuilder,
    private nativeService:AuthService,
    private notificationService : NotificationService,
    private commonService : CommonService,
    private router : Router,
    private storageService : StorageService,
  ){}

  ngOnInit(): void {
    this.getAllData();
    this.registerForm = this.formbuilder.group({
      name:[null,Validators.required],
      number:[null,Validators.required],
      dob:[null,Validators.required],
      gender:[null,Validators.required],
      state:[null,Validators.required],
      district:[null,Validators.required],
      taluk:[null,Validators.required],
      panchayat:[null,Validators.required],
      street:[null,Validators.required],
      pincode:[null,Validators.required]
    })
    
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

  public toggleSelection(value:string,data:any){
    if(value === 'State'){
      this.districtList = [];
      this.talukList = [];
      this.panchayatList = [];
      this.registerForm.patchValue({
        district:null,
        taluk:null,
        panchayat:null
      });
      const state = this.registerForm?.value?.state;
      this.districtList = this.commonService.filterByKey(this.districtData,'state',Number(state));
    }
    else if(value === 'District'){
      this.talukList = [];
      this.panchayatList = [];
      this.registerForm.patchValue({
        taluk:null,
        panchayat:null
      });
      const district = this.registerForm?.value?.district;
      this.talukList = this.commonService.filterByKey(this.talukData,'district',Number(district));
    }
    else if(value === 'Taluk'){
      this.panchayatList = [];
      this.registerForm.patchValue({
        panchayat:null
      })
      const taluk = this.registerForm?.value?.taluk;
      this.panchayatList = this.commonService.filterByKey(this.panchayatData,'taluk',Number(taluk));
    }
  }

  confirmAgreement(){
    if(this.registerForm?.valid){
      this.isAgreement = !this.isAgreement;
    }
    else{
      this.notificationService.showMessage('Please Fill all fields','Error');
    }
  }

  public register(){
    const value = this.registerForm?.value;
    const mobile_number = this.storageService?.getData('_n');
    const url ='user_detail/';      
    const payLoad ={
      "name":value?.name,
      "number":mobile_number,
      "whatsapp_number":value?.number,
      "date_of_birth":value?.dob,
      "sex":value?.gender,
      "role":role_id,
      "display_image":null,
      "state":value?.state,
      "district":value?.district,
      "taluk":value?.taluk,
      "panchayat":value?.panchayat,
      "address":value?.street,
      "pincode":value?.pincode
  }
    this.nativeService.post(url,payLoad).subscribe((res:any)=>{
      this.router.navigate(['auth/login']);
    },((Err:any)=>{

    }))
  }

  // STATE 
  private getState(){
    const url = 'state_detail/';
    return this.nativeService.get(url);
  }
  // DISTRICT 
  private getDistrict(){
    const url = 'district_detail/';
    return this.nativeService.get(url);
  }
  // TALUK 
  private getTaluk(){
    const url = 'taluk_detail/';
    return this.nativeService.get(url);
  }
  // PANCHAYAT 
  private getPanchayat(){
    const url = 'panchayat_detail/';
    return this.nativeService.get(url);
  }
  // AGREEMENT 
  private getAgreement(){
    const url = 'agreement_detail/';
    return this.nativeService.get(url);
  }
  // ALL DATA 
  getAllData() {
    forkJoin({
      state: this.getState(),
      district: this.getDistrict(),
      taluk: this.getTaluk(),
      panchayat: this.getPanchayat(),
      agreement:this.getAgreement()
    }).pipe(
      // Handle success
      tap((data:any) => {
        // Validate the data if necessary
        if (data.state && data.district && data.taluk && data.panchayat) {
          this.stateData = data?.state?.data;
          this.districtData = data?.district?.data;
          this.talukData = data?.taluk?.data;
          this.panchayatData = data?.panchayat?.data;
          this.agreementList = data?.agreement?.data;
        } else {
          console.error('Validation failed for the fetched data:', data);
        }
      }),
      // Handle errors
      catchError((error) => {
        this.notificationService.showMessage('Something went wrong','Error');
        return EMPTY;
      })
    ).subscribe();
  }
}
