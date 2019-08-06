import { TestBed, async, inject } from '@angular/core/testing';

import { IsLeagueAdminGuard } from './is-league-admin.guard';

describe('IsLeagueAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLeagueAdminGuard]
    });
  });

  it('should ...', inject([IsLeagueAdminGuard], (guard: IsLeagueAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
