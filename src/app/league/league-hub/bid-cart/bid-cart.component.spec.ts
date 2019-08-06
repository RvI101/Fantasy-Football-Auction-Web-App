import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidCartComponent } from './bid-cart.component';

describe('BidCartComponent', () => {
  let component: BidCartComponent;
  let fixture: ComponentFixture<BidCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
