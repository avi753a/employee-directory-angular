import { Component, ElementRef, QueryList, Renderer2, ViewChildren ,OnInit, effect} from '@angular/core';
import { Subject } from 'rxjs';
import { BlobOptions } from 'buffer';
import { ContentService, FilterModel } from '../../services/content.service';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent{
constructor(private contentService:ContentService,private renderer:Renderer2){
  effect(()=>{
    this.hideStatus=this.contentService.hideStatusComputed();

  })
}

hideStatus=false;
statusOptionsHidden=true;
locationOptionsHidden=true;
departmentOptionsHidden=true;
status:string="Active";
selectedStatus:string[]=[];
selectedLocations:string[]=[];
selectedDepartments:string[]=[];
isButtonHidden=true;
toggleStatusOptions(){
  this.statusOptionsHidden=!this.statusOptionsHidden;
}
toggleLocationOptions(){
  this.locationOptionsHidden=!this.locationOptionsHidden
}
toggleDepartmentOptions(){
  this.departmentOptionsHidden=!this.departmentOptionsHidden;
}
locationOptionList=["Hyderabad","Chennai","Delhi","Mumbai"]
departmentOptionList=["Product Dev","Design","Marketing","HR"]
private filterNavigation = new Subject<string>();
filterNotification = this.filterNavigation.asObservable();
applyFilter(){
  let filterData=new FilterModel(this.selectedStatus,this.selectedLocations,this.selectedDepartments);
  this.contentService.filterSignal.set(filterData);
}
@ViewChildren('checkboxInput') checkboxes!: QueryList<ElementRef>;
resetFilter(){
  this.checkboxes.forEach(checkboxRef => {
    const checkbox = checkboxRef.nativeElement;
    if (checkbox.checked) { 
      this.renderer.setProperty(checkbox, 'checked', false);
    }
  });
  this.contentService.filterSignal.set(null);
  this.statusOptionsHidden=true;
  this.locationOptionsHidden=true;
  this.departmentOptionsHidden=true;
  this.checkButtonHiding();
}

locationChange(value:string,event:Event){
    let ele:HTMLInputElement=event.target as HTMLInputElement;
    if(ele.checked){
      this.selectedLocations.push(value);
    }
    else{
      let index=this.selectedLocations.indexOf(value);
      this.selectedLocations.splice(index,1);
    }
    this.checkButtonHiding();
}
statusActive(value:string,event:Event){
  let ele:HTMLInputElement=event.target as HTMLInputElement;
    if(ele.checked){
      this.selectedStatus.push(value);
    }
    else{
      let index=this.selectedStatus.indexOf(value);
      this.selectedStatus.splice(index,1);
    }
    this.checkButtonHiding();
}
departmentChange(value:string,event:Event){
  let ele:HTMLInputElement=event.target as HTMLInputElement;
  if(ele.checked){
    this.selectedDepartments.push(value);
  }
  else{
    let index=this.selectedDepartments.indexOf(value);
    this.selectedDepartments.splice(index,1);
  }
  this.checkButtonHiding();
}
checkButtonHiding(){
this.isButtonHidden=(this.selectedStatus.length===0) && (this.selectedLocations.length===0) && (this.selectedDepartments.length===0);
}
}
