import { Component, Input,Output,EventEmitter} from '@angular/core';
import { ContentService, PageInfo } from '../../services/content.service';
import { NavigationService } from '../../services/navigation.service';
@Component({
  selector: 'app-page-info',
  standalone: true,
  imports: [],
  templateUrl: './page-info.component.html',
  styleUrl: './page-info.component.scss'
})
export class PageInfoComponent {
  @Input() pageInfo:PageInfo={};
  @Output() openFormEvent=new EventEmitter();
  constructor(private contentservice:ContentService){}
  openForm(){
    console.log("form");
    this.openFormEvent.emit();
  }
  downloadCSV(){
    this.contentservice.downloadCSVSignal.set(true);
  }
}
