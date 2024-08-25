import { Component, effect } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
@Component({
  selector: 'app-update-notify-box',
  standalone: true,
  imports: [],
  templateUrl: './update-notify-box.component.html',
  styleUrl: './update-notify-box.component.scss'
})
export class UpdateNotifyBoxComponent {
  constructor(private navigation_service:NavigationService){
    effect(()=>{
      this.navbar_compressed=this.navigation_service.navBarComputed();

    })
  }
  navbar_compressed=false;
}
