import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentService } from '../../services/content.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-letter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letter-bar.component.html',
  styleUrl: './letter-bar.component.scss'
})
export class LetterBarComponent {
  constructor(private contentService:ContentService){}
letterArray=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
 selectedButton: string="null";
activateBtn(alpha:string){
  if(this.selectedButton===alpha){
    this.selectedButton="null"
  }
  else{
  this.selectedButton=alpha;
  }
  this.contentService.letterFilterSignal.set(this.selectedButton);
}

}
