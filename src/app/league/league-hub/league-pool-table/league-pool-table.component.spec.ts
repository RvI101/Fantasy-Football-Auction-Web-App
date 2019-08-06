import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguePoolTableComponent } from './league-pool-table.component';

describe('LeaguePoolTableComponent', () => {
  let component: LeaguePoolTableComponent;
  let fixture: ComponentFixture<LeaguePoolTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaguePoolTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguePoolTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
