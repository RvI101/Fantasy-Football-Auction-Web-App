import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguePoolComponent } from './league-pool.component';

describe('LeaguePoolComponent', () => {
  let component: LeaguePoolComponent;
  let fixture: ComponentFixture<LeaguePoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaguePoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguePoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
