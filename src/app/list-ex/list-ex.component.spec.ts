import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExComponent } from './list-ex.component';

describe('ListExComponent', () => {
  let component: ListExComponent;
  let fixture: ComponentFixture<ListExComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
