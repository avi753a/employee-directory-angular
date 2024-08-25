import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch(),withInterceptors([authInterceptor]))]
};
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  let  authToken:string|null="";
  if (typeof window !== 'undefined') {
     authToken = localStorage.getItem('authToken');
  }
  if (authToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next(cloned);
  } else {
    return next(req);
  }
 
}