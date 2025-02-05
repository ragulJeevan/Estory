import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const userData : any = storageService.getData('_u');

  if (userData && userData.number) {
    router.navigate(['/core/stories']);
    return false;
  } else {
    return true;
  }
};
