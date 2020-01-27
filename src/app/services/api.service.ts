import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/index";

import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  formData : Employee

  constructor(private http: HttpClient) { }

  masterGET(): Observable<any> 
  {
    const result =  this.http.get('http://dummy.restapiexample.com/api/v1/employees')
    return result;
  } 

  async masterPOST(url, data) 
  {
    const result =  await this.http.post(url, data);
    return result;
 }

 async masterUPDATE(url, data) {
  const result =  await this.http.put(url, data);
  return result;
 }

 async masterDelete(url,id) {
  const result =  await this.http.delete(url + id);
  return result;
}

}
