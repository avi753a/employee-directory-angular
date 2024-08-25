import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('authToken')){
    return true;
  }
  else{
    let router=inject(Router);
    // router.navigate()
   return false;

  }
};
