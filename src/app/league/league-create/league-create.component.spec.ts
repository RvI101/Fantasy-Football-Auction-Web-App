import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueCreateComponent } from './league-create.component';

describe('LeagueCreateComponent', () => {
  let component: LeagueCreateComponent;
  let fixture: ComponentFixture<LeagueCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
