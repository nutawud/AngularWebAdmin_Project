import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderallComponent } from './orderall.component';

describe('OrderallComponent', () => {
  let component: OrderallComponent;
  let fixture: ComponentFixture<OrderallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
