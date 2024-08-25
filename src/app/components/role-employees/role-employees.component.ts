import { Component ,Input,OnInit, ViewChild, viewChild} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeInfo, ContentService, Role } from '../../services/content.service';
import { ZoomDirective } from '../../directives/zoom.directive';
@Component({
  selector: 'app-role-employees',
  standalone: true,
  imports: [],
  templateUrl: './role-employees.component.html',
  styleUrl: './role-employees.component.scss'
})
export class RoleEmployeesComponent implements OnInit{
  id!:string|null;
  name!:string|null;
  employeeList!:EmployeeInfo[];
  @Input() role!:Role;
constructor(private contentService:ContentService,private route:ActivatedRoute){}
ngOnInit(){
  this.initParams();
  if(this.id){
      this.contentService.getEmployeeData().subscribe({
        next:(data)=>{
          this.employeeList=data.filter((emp:EmployeeInfo)=>{
            return emp.roleName===this.role.name;
          })
        }
      })
      
  }
}
initParams(): void {
  this.route.queryParamMap.subscribe((params) => {
      this.id = params.get("id");
      this.name=params.get("roleName");
  })
}



}


