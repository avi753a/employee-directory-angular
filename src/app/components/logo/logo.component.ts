import { Component, effect } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  constructor(public navigation_service:NavigationService){
    effect(()=>{
      this.navbar_compressed=this.navigation_service.navBarCompressSignal();
    })
  }
  togglelogo="icon-TezoLogo";
  navbar_compressed=false;

}
