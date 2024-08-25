import { Component, Injector, effect, OnInit} from '@angular/core';
import { NavigationParams, NavigationService, PageRoute, toastAction } from '../../services/navigation.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LogoComponent } from "../../components/logo/logo.component";
import { MenuBoxComponent } from "../../components/menu-box/menu-box.component";
import { UpdateNotifyBoxComponent } from "../../components/update-notify-box/update-notify-box.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { ToastComponent } from "../../components/toast/toast.component";
import { EmployeeListPageComponent } from '../employee-list-page/employee-list-page.component';
import { RoleListPageComponent } from '../role-list-page/role-list-page.component';
import { RoleFormComponent } from '../../components/role-form/role-form.component';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import { RoleDetailsPageComponent } from '../role-details-page/role-details-page.component';
import { ContentService } from '../../services/content.service';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [LogoComponent, MenuBoxComponent, UpdateNotifyBoxComponent, SearchBarComponent, ToastComponent,RouterOutlet,EmployeeListPageComponent,RoleListPageComponent,RoleFormComponent,EmployeeFormComponent,RoleDetailsPageComponent]
})
export class MainComponent implements OnInit{
  ngOnInit(): void {
    if(localStorage.getItem('authToken')===null){
      this.navigationService.navigateToSignal.set(PageRoute.DashBoard);
    }
    else{
    }
  }
  constructor(private navigationService:NavigationService,private router:Router,private route:ActivatedRoute,private injector:Injector){
    effect(()=>{
      this.router.navigate([this.navigationService.navigateToComputed()],{relativeTo:this.route})
      console.log("navigated to ");
    })
    effect(()=>{
      let params=this.navigationService.navigateParamNotification();
        this.router.navigate([params.name],{queryParams:{mode:params.mode,id:params.id},relativeTo:this.route})
})
effect(()=>{
  this.navbar_compressed=this.navigationService.navBarComputed();
})
  }
  title = 'EmpApp';
  navbar_compressed=false;
  
  toggleNav(){
    this.navigationService.navBarCompressSignal.set(!this.navigationService.navBarCompressSignal());
  }
  menuitemlist= this.navigationService.menulist;

  
}
enum PageRoutes{
      Home="/home",
      DashBoard="/login",
      EmployeePage="./employees",
      RolePage="./roles",
      Access="/access",
      EmployeeFormpage="./employees/form",
      RoleFormPage="./roles/form",
      RoleDetailsPage="./roles/details"
}
