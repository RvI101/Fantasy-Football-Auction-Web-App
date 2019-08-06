import { TestBed } from '@angular/core/testing';

import { LeagueFactoryService } from './league-factory.service';

describe('LeagueFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeagueFactoryService = TestBed.get(LeagueFactoryService);
    expect(service).toBeTruthy();
  });
});
