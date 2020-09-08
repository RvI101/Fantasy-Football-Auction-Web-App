import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueMemberTableComponent } from './league-member-table.component';

describe('LeagueMemberTableComponent', () => {
  let component: LeagueMemberTableComponent;
  let fixture: ComponentFixture<LeagueMemberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeagueMemberTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueMemberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
