import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueAdminConsoleComponent } from './league-admin-console.component';

describe('LeagueAdminConsoleComponent', () => {
  let component: LeagueAdminConsoleComponent;
  let fixture: ComponentFixture<LeagueAdminConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueAdminConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueAdminConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
