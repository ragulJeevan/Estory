import { CanActivateFn } from '@angular/router';

export const roleguardGuard: CanActivateFn = (route, state) => {
  return true;
};
