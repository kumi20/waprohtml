import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentyMagazynoweComponent } from './dokumenty-magazynowe.component';

describe('DokumentyMagazynoweComponent', () => {
  let component: DokumentyMagazynoweComponent;
  let fixture: ComponentFixture<DokumentyMagazynoweComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentyMagazynoweComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentyMagazynoweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
