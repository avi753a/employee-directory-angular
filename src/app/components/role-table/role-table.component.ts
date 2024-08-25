import { Component, effect, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService, NavigationParams, PageRoute } from '../../services/navigation.service';
import { ContentService, Role } from '../../services/content.service';

@Component({
  selector: 'app-role-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-table.component.html',
  styleUrl: './role-table.component.scss'
})
export class RoleTableComponent implements OnInit{
  ngOnInit(): void {
    this.contentService.getRoleData().subscribe({
      next:(data) => {
      this.baseRoleList=data;
      this.roleList = data;
    },
     error:(errorMsg) => {
      console.error('Error fetching data:', errorMsg);
      if(errorMsg.status==401){
        this.errorMessage=true;
      }
    }
  });
  this.contentService.hideStatusSignal.set(true);
  }

  constructor(private navigationService:NavigationService,private contentService:ContentService){
    effect(()=>{
      let value=this.contentService.filterComputed();
      this.roleList=this.baseRoleList;
      if (value === null) {
        this.roleList = this.baseRoleList;
        return;
      }
      if(value.LocationList.length!==0){
        this.roleList=this.roleList.filter((emp)=>{
          return value?.LocationList.includes(emp.location);
        })
      }
      if(value.DepartmentList.length!==0){
        this.roleList=this.roleList.filter((emp)=>{
          return value?.DepartmentList.includes(emp.department);
        })
      }
    })
  }
  baseRoleList!:Role[];
  roleList!:Role[];
  errorMessage=false;
  image1='../../../assets/images/nullprofile.jpg';
  image2='../../../assets/images/nullprofile.jpg';
  image3='../../../assets/images/nullprofile.jpg';
  image4='../../../assets/images/nullprofile.jpg';
  empCount="";
openDetails(id:string){
  // this.navigationService.raiseNavigationWithId(new NavigationParams("RoleDetails","View",id));
  this.navigationService.navigateParamSignal.set(new NavigationParams(PageRoute.RoleDetails,"View",id));
  console.log("called edit with ",id);

}
editRole(id:string,name:string){
  this.navigationService.navigateParamSignal.set(new NavigationParams(PageRoute.Role,"Edit",id));
}
initImages(){
 
  }

}
