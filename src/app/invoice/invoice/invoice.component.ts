import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoce',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoceComponent implements OnInit {

  zmienna = true;
  
  constructor() { }

  ngOnInit(): void {
    console.log('tak')
  }

}
