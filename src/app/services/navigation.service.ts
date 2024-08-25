import { Injectable, WritableSignal, signal, effect, computed } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { 
  }
  
  public menulist: MenuItem[] = [
    new MenuItem('ALL', [
      new NavItem("Dashboard","icon-dashboard",PageRoute.DashBoard),
      new NavItem('Employees', 'icon-team_1',PageRoute.Employee), 
    ]),
    new MenuItem('ROLE/USERMANAGEMENT', [
      new NavItem('Roles', 'icon-Roles',PageRoute.Role),
      new NavItem('Access Rights',"icon-assign-user",PageRoute.Access),

    ]),
  ];
  

  navigateToSignal=signal<PageRoute>(PageRoute.Home);
  navigateToComputed=computed(()=>this.navigateToSignal());
  navigateParamSignal=signal<NavigationParams>(new NavigationParams(PageRoute.Home,"",""));
  navigateParamNotification=computed(()=>this.navigateParamSignal());
  activeNavigation=computed(()=>this.navigateToSignal());
  navBarCompressSignal=signal<boolean>(false);
  navBarComputed=computed(()=>this.navBarCompressSignal());
  showToastSignal=signal<toastAction>(toastAction.Default);
  toastNotification=computed(()=>this.showToastSignal())


}

export enum PageRoute{
  Home="",
  DashBoard="/loginform",
  Employee="./employees",
  Role="./roles",
  Access="/access",
  EmployeeForm="./employees/form",
  RoleForm="./roles/form",
  RoleDetails="./roles/details"
}
export class NavItem {
  constructor(public name: string, public iconClass:string,public navigationEventValues:PageRoute) {}
}

export class MenuItem {
  constructor(public name?: string, public Navlist?: NavItem[]) {}
}
export class NavigationParams{
      constructor(public name:PageRoute,public mode:string,public id:string){}
}
export enum toastAction {
  LoginOk = "loginOK",
  LoginFail = "loginFail",
  EmployeeCreated = "employeeCreated",
  RoleCreated = "roleCreated",
  EmployeeEdited = "employeeEdited",
  RoleEdited = "roleEdited",
  InvalidForm = "invalidForm",
  EmployeeFailed = "employeeFailed",
  RoleFailed = "roleFailed",
  EmployeeDeleted="employeeDeleted",
  Default=""
}