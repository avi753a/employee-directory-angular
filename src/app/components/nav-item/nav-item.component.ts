import { Component,Input,Output,EventEmitter, effect} from '@angular/core';
import { NavItem, NavigationService, PageRoute } from '../../services/navigation.service';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
  constructor(private nav_service:NavigationService){
    effect(()=>{
      this.navbar_compressed=this.nav_service.navBarComputed();
    })
    effect(()=>{
      if(this.navItemInfo.navigationEventValues===this.nav_service.activeNavigation()){
        this.isActive=true;
      }
      else{
        this.isActive=false;
      }
    })
  }
  isActive=false;
@Input() navItemInfo!:NavItem;
@Output() navigateToSignal: EventEmitter<string> = new EventEmitter<string>();
navbar_compressed=false;

loadPage(){
  // this.isActive=true;
    // this.nav_service.raiseNavigation(this.navItemInfo.navigationEventValues);
    this.nav_service.navigateToSignal.set(this.navItemInfo.navigationEventValues);
}
}
