import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, effect, signal } from '@angular/core';
import { error } from 'console';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 
    effect(()=>{
      this.invalidTokenComputed();
      localStorage.removeItem('authToken');

    })
  }
  token:string="";
  canNavigate=false;
  
   login(credentials: LoginCredentials):void{
     this.http.post("https://localhost:7259/Login", credentials, { responseType: 'text' }).
      subscribe({
        next: (value) => {
          this.token = value;
          if (typeof window !== 'undefined') {
            // Now we are in the browser, it's safe to use localStorage
            localStorage.setItem('authToken', value);
          }
          this.canNavigate = true;
          this.loggedIn.next(true);
        },
        error: (msg) => {
          console.log(msg);
          if(typeof window!=='undefined'){
            localStorage.removeItem('authToken');
          }
          this.loggedIn.next(false);
        }
      });
}
private loggedIn=new Subject<boolean>();
loggedInNotification=this.loggedIn.asObservable();
getAuthToken():string{
  return this.token;
}
getIsLoggedIn():boolean{
  let token:string|null="";
  if (typeof window !== 'undefined') {
     token=localStorage.getItem('authToken');
  }
  if(token){
    return true;
  }
  else{
    return false;
  }
}

invalidTokenSignal=signal(false);
invalidTokenComputed=computed(()=>this.invalidTokenSignal());
}
export class LoginCredentials{
  constructor(
    public identifier:string,
    public password:string
  ){}
}
