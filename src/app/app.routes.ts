import { Routes } from '@angular/router';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { RoleTableComponent } from './components/role-table/role-table.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { MainComponent } from './pages/main/main.component';
import { EmployeeListPageComponent } from './pages/employee-list-page/employee-list-page.component';
import { RoleListPageComponent } from './pages/role-list-page/role-list-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleDetailsPageComponent } from './pages/role-details-page/role-details-page.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:"",redirectTo:"main",pathMatch:"full"},
    {path:"main",component:MainComponent,
    children:[
        {path:"employees",component:EmployeeListPageComponent},
        {path:"roles",component:RoleListPageComponent},
        {path:'employees/form',component:EmployeeFormComponent},
        {path:"roles/form",component:RoleFormComponent},
        {path:"roles/details",component:RoleDetailsPageComponent},
        {path:"",redirectTo:"employees",pathMatch:'full'},
    ]},
    {path:"loginform",component:LoginComponent}
];
