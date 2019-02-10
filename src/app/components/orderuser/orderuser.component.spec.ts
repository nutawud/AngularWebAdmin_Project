import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderuserComponent } from './orderuser.component';

describe('OrderuserComponent', () => {
  let component: OrderuserComponent;
  let fixture: ComponentFixture<OrderuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
