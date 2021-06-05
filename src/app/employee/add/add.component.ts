import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  id: any = '';
  sub: any;
  employeeForm: FormGroup
  photo: any;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private apiService: ApiServiceService, private router: Router) {
    this.sub = this.activatedRoute.queryParams.subscribe(res => this.id = res.id);
    console.log(this.id)
  }

  ngOnInit(): void {
    if(this.id!==undefined){
      this.getSingleEmployee()
    }
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required],

    })
  }

  getSingleEmployee(){
    let url='employee/'+this.id;
  this.apiService.get(url).subscribe(res=>{
    console.log(res);
    if(res.status==='success'){
      let body={
        name:res.data.employee_name,
        salary:res.data.employee_salary,
        age:res.data.employee_age
      }
      this.employeeForm.patchValue(body)
    }
    
  })

  }


  save() {
    if (this.id != undefined) {
      let url = 'update/' + this.id;
      let body = this.employeeForm.value;
      console.log(url, body);
      this.apiService.put(url, body).subscribe(res => {
        console.log(res);
        if (res.status == 'success') {
          this.router.navigate(['/home'])

        }

      })
    } else {
      let url = 'create';
      let body = this.employeeForm.value;
      console.log(url, body);
      this.apiService.post(url, body).subscribe(res => {
        console.log(res);
        if (res.status == 'success') {
          this.router.navigate(['/home'])

        }


      })
    }
  }



}
