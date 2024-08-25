import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { RoleFormComponent } from '../../components/role-form/role-form.component';

@Component({
  selector: 'app-add-role-page',
  standalone: true,
  imports: [RoleFormComponent,SearchBarComponent],
  templateUrl: './add-role-page.component.html',
  styleUrl: './add-role-page.component.scss'
})
export class AddRolePageComponent {

}
