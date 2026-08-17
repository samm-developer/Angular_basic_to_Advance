import { TestBed } from '@angular/core/testing';
import { StatsService } from './stats.service';

describe('StatsService', () => {
  let service: StatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsService);
  });

  it('should count completed tasks', () => {
    const tasks = [
      { id: 1, title: 'A', dueDate: '2026-08-20', done: true },
      { id: 2, title: 'B', dueDate: '2026-08-21', done: false },
    ];

    expect(service.completedCount(tasks)).toBe(1);
    expect(service.remainingCount(tasks)).toBe(1);
  });

  it('should return 0 for empty list', () => {
    expect(service.completedCount([])).toBe(0);
    expect(service.remainingCount([])).toBe(0);
  });
});
