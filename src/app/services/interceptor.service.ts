import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { inject } from '@angular/core';
import { CommonService } from './common.service';

export const interceptorFn: HttpInterceptorFn = (req, next) => {

  const notificationService = inject(NotificationService);
  const loader = inject(CommonService);

  loader.setLoader(true);

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer your-token-here`,
    },
  });

  return next(modifiedReq).pipe(
    catchError((error) => {
      console.error('Error intercepted:', error);
      if (error.status === 401) {
        notificationService.showMessage('Unauthorized access - redirecting to login');
      }
      else {
        notificationService.showMessage(error?.error?.message,'Error');
      }
      return throwError(() => new Error('An error occurred while processing the request.'));
    }),
    finalize(() => {
      // Set the loader to false after the request completes (success or error)
      loader.setLoader(false);
    })
  );
};
