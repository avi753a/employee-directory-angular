import { Component } from '@angular/core';
import { EmployeeTableComponent } from '../../components/employee-table/employee-table.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { LetterBarComponent } from '../../components/letter-bar/letter-bar.component';
import { PageInfoComponent } from '../../components/page-info/page-info.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

import { Router,RouterLink,RouterLinkActive,RouterOutlet} from '@angular/router';
import { ContentService } from '../../services/content.service';
import { NavigationService,PageRoute } from '../../services/navigation.service';



@Component({
  selector: 'app-employee-list-page',
  standalone: true,
  imports: [SearchBarComponent,PageInfoComponent,LetterBarComponent,FilterBarComponent,EmployeeTableComponent,RouterOutlet,RouterLink],
  templateUrl: './employee-list-page.component.html',
  styleUrl: './employee-list-page.component.scss'
})
export class EmployeeListPageComponent {
  constructor(private contentService:ContentService,private navService:NavigationService){
  }
  pageInfo=this.contentService.employeePafeInfo;
  openForm(){
    this.navService.navigateToSignal.set(PageRoute.EmployeeForm);
      console.log("Called add employee");
      
  }

}
