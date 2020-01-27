import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private toastr: ToastrService, private router : Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username :  new FormControl(null, Validators.required),
      password : new FormControl(null, Validators.required)
    });
  }

  onSubmit()
  {
    if(this.form.value.username == "nikhil" && this.form.value.password == "nikhil")
    {
      this.router.navigate(['/home']);
      this.toastr.success('Login Success!', ' Valid Credentials!');
      console.log("login success");
    }
    else{
      this.router.navigate(['/login']);
      this.toastr.error('Login Unsuccess!', 'Invalid Credentials!');
      console.log("login unsuccess");
    }
  }

}
