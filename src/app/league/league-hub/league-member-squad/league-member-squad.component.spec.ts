import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueMemberSquadComponent } from './league-member-squad.component';

describe('LeagueMemberSquadComponent', () => {
  let component: LeagueMemberSquadComponent;
  let fixture: ComponentFixture<LeagueMemberSquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeagueMemberSquadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueMemberSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
