import { Component, ElementRef, Injectable, ViewChild, OnInit, Renderer2 ,effect} from '@angular/core';
import { NavigationService, toastAction } from '../../services/navigation.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent  {
 
  constructor(private navservice: NavigationService) { 
    effect(()=>{
      const actionFunction=this.toastActionMap[this.navservice.toastNotification()];
      if (actionFunction) {
        actionFunction();
      } else {
        console.warn(`Unknown action: ${this.navservice.toastNotification()}`);
      }
    })
  }
  @ViewChild('toast') toastElement!: ElementRef<HTMLDivElement>;
  @ViewChild('closeIcon') closeIconElement!: ElementRef;
  @ViewChild('progress') progressElement!: ElementRef;

  message: string = 'heading';
  messageText: string = 'text';
  color: string = 'blue';

  showToast() {
    let ele = document.getElementsByClassName("toast")[0] as HTMLDivElement;
    let progress = document.getElementsByClassName("progress")[0];
    ele?.classList.add('active');
    progress.classList.add('active');

    setTimeout(() => {
      ele.classList.remove('active');
    }, 5000);

    setTimeout(() => {
      progress.classList.remove('active');
    }, 5300);
  }

  loginOk() {
    this.message = "LoggedIn";
    this.messageText = "Login Successful"
    this.color = "green";
    this.showToast();
  }
  loginFail() {
    this.message = "Login Failed";
    this.messageText = "Check username and password";
    this.color = "red";
    this.showToast();
  }
  employeeCreated() {
    this.message = "Success";
    this.messageText = "New Employee Created";
    this.color = "green";
    this.showToast();

  }
  roleCreated() {
    this.message = "Success";
    this.messageText = "New Role Created";
    this.color = "green";
    this.showToast();

  }
  employeeEdited() {
    this.message = "Success";
    this.messageText = "Employee Edited";
    this.color = "blue";
    this.showToast();

  }
  roleEdited() {
    this.message = "Success";
    this.messageText = "Role Edited";
    this.color = "blue";
    this.showToast();

  }
  invalidForm() {
    this.message = "Invalid Form";
    this.messageText = "Check the given values";
    this.color = "blue";
    this.showToast();

  }
  employeeFailed() {
    this.message = "Error";
    this.messageText = "Failed to create employee";
    this.color = "red";
    this.showToast();

  }
  roleFailed() {
    this.message = "Error";
    this.messageText = "Failed to create role";
    this.color = "red";
    this.showToast();

  }
  employeeDeleted(){
    this.message = "Employee Deleted";
    this.messageText = "";
    this.color = "orange";
    this.showToast();
  }
  Donone(){

  }
  onCancel() {
    let ele = document.getElementsByClassName("toast")[0] as HTMLDivElement;
    ele.classList.remove('active');
  }
  private toastActionMap = {
    [toastAction.LoginOk]: () => this.loginOk(),
    [toastAction.LoginFail]: () => this.loginFail(),
    [toastAction.EmployeeCreated]: () => this.employeeCreated(),
    [toastAction.RoleCreated]: () => this.roleCreated(),
    [toastAction.EmployeeEdited]: () => this.employeeEdited(),
    [toastAction.RoleEdited]: () => this.roleEdited(),
    [toastAction.InvalidForm]: () => this.invalidForm(),
    [toastAction.EmployeeFailed]: () => this.employeeFailed(),
    [toastAction.RoleFailed]: () => this.roleFailed(),
    [toastAction.EmployeeDeleted]:()=>this.employeeDeleted(),
    [toastAction.Default]:()=>this.Donone()
  };
}
