import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  checkbox:any;
  cia: any;
  dept: string;
  fleet: number;
  service: string;
  name: string;
  status: string;
  workflow: string;
  due_date: string;
  empty: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { checkbox:"",cia: 1, dept: 'OPR', fleet: 737, service: 'H', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
  { checkbox:"",cia: 2, dept: 'OPR', fleet: 737, service: 'He', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
  { checkbox:"",cia: 3, dept: 'OPR', fleet: 737, service: 'Li', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
  { checkbox:"",cia: 4, dept: 'OPR', fleet: 737, service: 'Be', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
  { checkbox:"",cia: 5, dept: 'OPR', fleet: 1737, service: 'B', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
  { checkbox:"",cia: 6, dept: 'OPR', fleet: 1737, service: 'C', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
  { checkbox:"",cia: 7, dept: 'OPR', fleet: 1737, service: 'N', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
  { checkbox:"",cia: 8, dept: 'OPR', fleet: 1737, service: 'O', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
  { checkbox:"",cia: 9, dept: 'OPR', fleet: 1737, service: 'F', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
  { checkbox:"",cia: 10, dept: 'OPR', fleet: 2737, service: 'Ne', name: 'Pedro Garcia', status: '*', workflow: 'icons', due_date: '22/06/2023', empty: '' },
];


@Component({
  selector: 'app-table-home',
  templateUrl: './table-home.component.html',
  styleUrls: ['./table-home.component.css']
})
export class TableHomeComponent implements OnInit {
  
  checkStatus:any;
  dataSource: any = MatTableDataSource<any>;
  constructor() { }

  displayedColumns: string[] = ['checkbox','cia','dept','fleet','service','name','status','workflow','due_date','empty'];
  @ViewChild(MatSort, { static: true }) sort: any = MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;

    this.checkStatus = "checkStatus"
  }

}
