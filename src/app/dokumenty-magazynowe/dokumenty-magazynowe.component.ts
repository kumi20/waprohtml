import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dokumenty-magazynowe',
  templateUrl: './dokumenty-magazynowe.component.html',
  styleUrls: ['./dokumenty-magazynowe.component.scss']
})
export class DokumentyMagazynoweComponent implements OnInit {

  dataSource = [
    {
      "numer": 1,
      "data": "2020-12-01",
      "kontahent": "Żabka",
      "wartość netto": 546.54
    },
    {
      "numer": 2,
      "data": "2020-12-02",
      "kontahent": "Społem",
      "wartość netto": 547.45
    },
    {
      "numer": 3,
      "data": "2020-12-03",
      "kontahent": "Społem",
      "wartość netto": 4546.37
    },
    {
      "numer": 4,
      "data": "2020-12-04",
      "kontahent": "Biedronka",
      "wartość netto": 5534.96
    },
    {
      "numer": 5,
      "data": "2020-12-05",
      "kontahent": "Auchan",
      "wartość netto": 2342.44
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
