import { Component } from '@angular/core';
import { Emp } from '../_models/emp';
import { EmpService } from '../_services/emp.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  employees!: Emp[];
  totalrow: number = 0;

  constructor(private empService: EmpService,) { }

  ngOnInit(): void {
    this.loadEmployee();
  }

loadEmployee() {
    this.empService.getAll().pipe(first())
      .subscribe(d => {
        this.employees = d;
        this.totalrow = d.length;
      });
  }

  delete(emp: Emp) {
    this.empService.delete(emp.empId).pipe(first())
      .subscribe(() => {
        this.loadEmployee();
      })
  }

}
