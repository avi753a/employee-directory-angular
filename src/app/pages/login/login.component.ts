import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { NavigationService ,NavigaitonEventValues, toastAction} from '../../Services/navigation.service';
import { Router } from '@angular/router';
import { AuthService, LoginCredentials } from '../../services/auth.service';
import { ToastComponent } from '../../components/toast/toast.component';
import { NavigationService, toastAction } from '../../services/navigation.service';
// import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private navigationService:NavigationService,
    private toast:ToastComponent,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as LoginCredentials;
      this.authService.login(credentials);
    }
    this.authService.loggedInNotification.subscribe({
      next:(value:boolean)=>{
        if(value){
          this.router.navigate(["/main"]);
          this.navigationService.showToastSignal.set(toastAction.LoginOk);
            }
        else{
          console.log("called false navi");
        }
      }
    })
  }
}
 