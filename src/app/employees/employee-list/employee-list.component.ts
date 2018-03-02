import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { element } from 'protractor';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers:[EmployeeService]
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];

  constructor(private employeeService:EmployeeService) {}

  ngOnInit() {
    var emp = this.employeeService.getData();
    emp.snapshotChanges().subscribe(item=>{
      this.employeeList = [];
      item.forEach(element=>{
        var empData = element.payload.toJSON();
        empData["$key"] = element.key;
        this.employeeList.push(empData as Employee);
      });
    });
  }
  onEdit(emp:Employee){
    debugger
    this.employeeService.selectedEmployee = emp;
    //this.employeeService.selectedEmployee = Object.assign({},emp);
  }

}
