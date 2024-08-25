import { Component } from '@angular/core';
import { PageInfoComponent } from '../../components/page-info/page-info.component';
import { RoleTableComponent } from '../../components/role-table/role-table.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ContentService } from '../../services/content.service';
import { NavigationService, PageRoute } from '../../services/navigation.service';

@Component({
  selector: 'app-role-list-page',
  standalone: true,
  imports: [SearchBarComponent,FilterBarComponent,RoleTableComponent,PageInfoComponent],
  templateUrl: './role-list-page.component.html',
  styleUrl: './role-list-page.component.scss'
})
export class RoleListPageComponent {
  constructor(private contentService:ContentService,private navService:NavigationService){}
  rolePageInfo=this.contentService.rolePageInfo;
  openForm(){
    this.navService.navigateToSignal.set(PageRoute.RoleForm);
  }

}
