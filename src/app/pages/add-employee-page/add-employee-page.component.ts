import { Component,signal } from '@angular/core';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { NavigationService } from '../../services/navigation.service';

type NewType = typeof signal<boolean>;

@Component({
  selector: 'app-add-employee-page',
  standalone: true,
  imports: [EmployeeFormComponent,SearchBarComponent],
  templateUrl: './add-employee-page.component.html',
  styleUrl: './add-employee-page.component.scss'
})
export class AddEmployeePageComponent {



  /**
   *
   */
  constructor( protected ns: NavigationService) {
    
  }

}
