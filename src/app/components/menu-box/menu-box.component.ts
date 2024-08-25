import { Component,Input,Output,EventEmitter} from '@angular/core';
import { NavItemComponent } from '../nav-item/nav-item.component';
import { MenuItem } from '../../services/navigation.service';

@Component({
  selector: 'app-menu-box',
  standalone: true,
  imports: [NavItemComponent],
  templateUrl: './menu-box.component.html',
  styleUrl: './menu-box.component.scss'
})
export class MenuBoxComponent {
  @Input() menuInfo:MenuItem={};
  
}
