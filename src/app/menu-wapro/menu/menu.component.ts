import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private translate: TranslateService, public event: EventService) {
    (localStorage.getItem('lang')?translate.setDefaultLang(localStorage.getItem('lang')):translate.setDefaultLang('pl'))

    event.language.subscribe(lang=>translate.use(lang))
   }

  ngOnInit(): void {
  }
}
