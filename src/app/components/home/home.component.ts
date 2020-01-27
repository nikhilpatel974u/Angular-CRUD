import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  isEditObj: any;
  isDeleteObj: any;
  employee: any[];
  showAddForm: boolean = false;
  showDeleteForm: boolean = false


  constructor(private api: ApiService, private toastr: ToastrService, private router : Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      employee_name :  new FormControl(null, Validators.required),
      employee_salary : new FormControl(null, Validators.required),
      employee_age : new FormControl(null, Validators.required)
    });

    this.api.masterGET()
    .subscribe(
    data=>{
      this.employee = data.data;
      console.log("data : ", data)
    }
  );  

  }

  get f() { return this.form.controls; }

  openForm()
  {
    this.showAddForm = true;
    this.form.reset();
  }

  cancel_event()
  {
    this.showAddForm = false;
    this.showDeleteForm = false;

  }
  async editForm(data) {
    this.showAddForm = true;
    this.isEditObj = data;

    this.f.employee_name.setValue(data.employee_name);
    this.f.employee_salary.setValue(data.employee_salary);
    this.f.employee_age.setValue(data.employee_age);

  }

async deleteRecord(data) {
  this.showDeleteForm = true;
  this.isDeleteObj = data;
  console.log("Delete Operation", this.isDeleteObj);

}

async delete_form(ref) {
 const deleteRes:any = await this.api.masterDelete('http://dummy.restapiexample.com/api/v1/delete/', this.isDeleteObj.id);
 this.showDeleteForm = false;
 this.toastr.success('Deleted successfully', 'Employee Deleted');

}

  onSubmitData(ref)
  {
    if (this.isEditObj) {
      console.log("Update Operation");

      const data = {
        "id" : this.isEditObj.id,
        "employee_name" : this.form.value.employee_name,
        "employee_salary" : this.form.value.employee_salary,
        "employee_age" : this.form.value.employee_age
      };

      const result: any =  this.api.masterUPDATE('http://dummy.restapiexample.com/api/v1/update/', data);
      this.showAddForm = false;
      this.toastr.success('Updated successfully', 'Employee Updated');
    }

  else {
    this.isEditObj = null;
    const data = {
      "employee_name" : this.form.value.employee_name,
      "employee_salary" : this.form.value.employee_salary,
      "employee_age" : this.form.value.employee_age
  }

    const result: any =  this.api.masterPOST('http://dummy.restapiexample.com/api/v1/create', data);
    this.showAddForm = false;
    this.toastr.success('Inserted successfully', 'Employee Added');
  }
 }

}
