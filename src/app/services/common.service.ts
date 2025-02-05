import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private loggedIn$ = new BehaviorSubject<Boolean>(false);
  private isLoader$ = new BehaviorSubject<Boolean>(false);

  constructor() { }

  setLogin(value: boolean) {
    this.loggedIn$.next(value)
  }

  getLogin() {
    return this.loggedIn$;
  }

  setLoader(loader: Boolean) {
    this.isLoader$.next(loader);
  }

  getLoader() {
    return this.isLoader$;
  }

  filterByKey(array: any, key: string, value: number) {
    const returnData = array.filter((item: any) => item[key] === value);
    return returnData;
  }

}
