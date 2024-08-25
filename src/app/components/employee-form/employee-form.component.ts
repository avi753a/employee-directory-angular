import { Component, OnInit, Input, viewChild, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavigationService, toastAction, PageRoute } from '../../services/navigation.service';
import { Role, ContentService, EmployeeInfo } from '../../services/content.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',

})
export class EmployeeFormComponent implements OnInit{
  employeeForm!:FormGroup;
   mode:string="create";
   id!:string|null;
   isCreateMode=false;
   roleList!:Role[];
   imageData:string="";
   isImageButtonHidden=false;
   
   ImageAdderss="../../../assets/images/nullprofile.jpg";
   @ViewChild('profilepic') profilepic!: ElementRef<HTMLImageElement>;
   constructor(private fb: FormBuilder,private route:ActivatedRoute,private contentService:ContentService,private navService:NavigationService) {}
  ngOnInit(): void {
    this.initFormModel();
    this.initParams();
    this.loadRoles();
    this.initForm()
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      if(this.mode==="create"){
        let formData=this.employeeForm.value;
        let dataToSend=this.ConvertFormToInfo(formData,this.imageData);
        this.isImageButtonHidden=true;
        this.contentService.createEmployee(dataToSend).subscribe(
          {
            next:(data)=>{
              console.log(data);
              this.navService.showToastSignal.set(toastAction.EmployeeCreated);
            },
            error:(msg)=>{
              console.log(msg);
              this.navService.showToastSignal.set(toastAction.EmployeeFailed);
            }
          }
        );
      }
      else if(this.mode==="Edit"){
        let dataToSend=this.ConvertFormToInfo(this.employeeForm.value as EmployeeFormData,this.imageData);
        this.contentService.editEmployee(this.employeeForm.value).subscribe({
          next:(data)=>{
            this.navService.showToastSignal.set(toastAction.EmployeeEdited);
          }
        });
      }
    } else {
      this.navService.showToastSignal.set(toastAction.InvalidForm);
        }
  }
  onFileSelected(event:any) {
    const file: File = event.target?.files[0];
    if (file) {
      // Convert image to Base64 and store in local storage
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ImageAdderss=reader.result as string;
        this.imageData=this.ImageAdderss;
      };
    }
  }
  get formValue() {
    return this.employeeForm.controls;
  }

    initFormModel():void{
      this.employeeForm= this.fb.group({
        id: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        emailId: ['', [Validators.required, Validators.email]],
        mobileNo: ['', Validators.required],
        dateOfJoining: ['', Validators.required],
        location: [null, Validators.required],
        roleName: [null, Validators.required],
        department: [null, Validators.required],
        managerName: [null, Validators.required],
        projectName: [null, Validators.required],
      });
    }
    initParams():void{
        this.route.queryParamMap.subscribe((params)=>{
          let temp_mode=params.get("mode");
          if(temp_mode){
            this.mode=temp_mode;
            this.id=params.get("id");
          }
        })
    }
    initForm(){
        if(this.mode=="create"){
            this.createForm();
        }
        else{
          this.fillForm();
        }
    }
    createForm(){
        this.isCreateMode=true;
        this.employeeForm.get("id")?.setValue("0");
        this.employeeForm.get("dateOfJoining")?.setValue("22-03-2024");
    }
    fillForm(){
      if(this.id)
        this.contentService.fetchEmployeeDetails(this.id).subscribe(
          {
            next:(data)=>{
              this.employeeForm.setValue(this.ConvertToForm(data));
              this.setImage(data.imageUrl);
            },
            error:(msg)=>{
                console.log(msg);
                this.mode="create";
                this.isCreateMode=true;
            }
          }
        )
        this.employeeForm.get("id")?.disable();
        if(this.mode==="View"){
          this.employeeForm.disable();
        }
    }
    onCancel(){
      this.navService.navigateToSignal.set(PageRoute.Access);
    }
    loadRoles(){
      this.contentService.getRoleData().subscribe(
        {
          next:(data)=>{
            this.roleList=data;
          },
          error:(msg)=>{
            console.log(msg);
          }
        }
      )
    }
    ConvertToForm(a:EmployeeInfo):EmployeeFormData{
          return new EmployeeFormData(a.id,a.firstName,a.lastName,a.dateOfBirth,a.emailId,a.mobileNo,a.dateOfJoining,a.location,a.roleName,a.department,a.managerName,a.projectName)
    }
    ConvertFormToInfo(a:EmployeeFormData,image:string){
      return new EmployeeInfo(a.id,a.firstName,a.lastName,a.dateOfBirth,a.emailId,a.mobileNo,a.dateOfJoining,a.location,a.roleName,a.department,a.managerName,a.projectName,image);
    }
  //#endregion
 setImage(imageUrl: string) {
    this.profilepic.nativeElement.src=imageUrl;
    this.imageData=imageUrl;
  }

  }

class EmployeeFormData{
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public emailId: string,
    public mobileNo: string,
    public dateOfJoining: string,
    public location: string,
    public roleName: string,
    public department: string,
    public managerName: string,
    public projectName: string,
  ) {} 
}


