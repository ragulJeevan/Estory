import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

const encrypt_key = environment.encrypt_key;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Method to store data in localStorage
  postData(key: string, data: any): void {
    const encryptedData = this.encryptData(data);
    localStorage.setItem(key, encryptedData);
  }

  // Method to retrieve data from localStorage
  getData(key: string): any {
    const value : any = localStorage.getItem(key);
    const encryptedData = value ? this.decryptData(value) : null;
    return encryptedData ? encryptedData : null;
  }

  // Method to remove data from localStorage
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  // Method to clear all data in localStorage
  clearAll(): void {
    localStorage.clear();
  }

  // To encrypt data
  encryptData(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), encrypt_key).toString();
    return encryptedData;
  }

  // To decrypt data
  decryptData(encryptedData: string): any {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, encrypt_key);
    const decryptedData = (decryptedBytes?.sigBytes > 0) ? JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8)) : null;
    return decryptedData;
  }

}
