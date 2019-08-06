import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueHubComponent } from './league-hub.component';

describe('LeagueHubComponent', () => {
  let component: LeagueHubComponent;
  let fixture: ComponentFixture<LeagueHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
