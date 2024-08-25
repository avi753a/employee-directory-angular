import { Component ,OnInit} from '@angular/core';
import { RoleEmployeesComponent } from '../../components/role-employees/role-employees.component';
import { PageInfoComponent } from '../../components/page-info/page-info.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ContentService, PageInfo, Role } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { ParseFlags } from '@angular/compiler';

@Component({
  selector: 'app-role-details-page',
  standalone: true,
  imports: [SearchBarComponent,PageInfoComponent,RoleEmployeesComponent],
  templateUrl: './role-details-page.component.html',
  styleUrl: './role-details-page.component.scss'
})
export class RoleDetailsPageComponent implements OnInit{
  id!:string;
  roleInfo!:Role;
ngOnInit(): void {
  this.initParams();
  this.contentService.fetchRoleDetails(this.id).subscribe(
    {
      next:(data)=>{
        this.roleInfo=data;
        this.pageInfo.pageHeading=this.roleInfo?.name;
        this.pageInfo.pageDescription=this.roleInfo?.description;
      }
    }
  )
}
constructor(private contentService:ContentService,private route:ActivatedRoute){}
pageInfo=this.contentService.rolePageInfo;
initParams(): void {
  this.route.queryParamMap.subscribe((params) => {
    console.log(params);
      this.id = params.get("id") as string;
  })
}
}
