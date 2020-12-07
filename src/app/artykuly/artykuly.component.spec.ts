import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtykulyComponent } from './artykuly.component';

describe('ArtykulyComponent', () => {
  let component: ArtykulyComponent;
  let fixture: ComponentFixture<ArtykulyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtykulyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtykulyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
