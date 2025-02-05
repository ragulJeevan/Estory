import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const userData : any = storageService.getData('_u');
  if (userData && userData?.number) {
    return true;
  } else {   
    router.navigate(['/auth/login']);
    return false;
  }
};
