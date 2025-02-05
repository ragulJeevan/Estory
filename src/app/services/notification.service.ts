import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  showMessage(message: string, title: string = 'Error') {
    if(title === 'Error'){
      this.toastr.error(message, '', {
        closeButton: true,
        timeOut: 3000,
      });
    }
    else if(title === 'Success'){
      this.toastr.success(message, '', {
        closeButton: true,
        timeOut: 3000,
      });
    }
    else if(title === 'Info'){
      this.toastr.info(message, '', {
        closeButton: true,
        timeOut: 3000,
      });
    }

    else if(title === 'Warning'){
      this.toastr.warning(message, '', {
        closeButton: true,
        timeOut: 3000,
      });
    }
  }
}
