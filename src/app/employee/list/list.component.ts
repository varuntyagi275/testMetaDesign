import { Component, OnInit, TemplateRef } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  employeeList: any;
  dataToView: any;
  idToDelete: string='';
  searchSubject: any;

  constructor(private apiService:ApiServiceService,  private modalService: MdbModalService, ) {

    this.searchSubject=apiService.searchObservable.subscribe(res=>{
      console.log('in list',res);
      this.search(res)
    })
   }


   search(res:any){
     if(res!=''){
     this.employeeList=this.employeeList.filter((ele:any)=>{
       ele.employee_name=ele.employee_name.toLowerCase();
       return ele.indexOf(res)>1;
     })
    }else{
      this.getEmployeeList()
    }

   }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  getEmployeeList(){
    let url='employees'
    this.apiService.get(url).subscribe(res=>{
console.log(res)
if(res.status=='success'){
  this.employeeList=res.data
}
    })
  }

  openModal(modal:any,data:any){
    this.dataToView=data
    this.modalService.open(modal,{
      data:this.dataToView
    })
  }


  openModalForDelete(modal:any,data:string){
    this.idToDelete=data
    this.modalService.open(modal,{
      data:this.dataToView
    })
  }

  deleteuser(idToDelete:any){
    let url='delete/'+idToDelete;
    this.apiService.delete(url).subscribe(res=>{
      console.log('res',res);
      
      if(res.status=='success'){
        alert(res.message)
        this.getEmployeeList()

      }else{
        alert(res.message)
      }
    })
  }

}
