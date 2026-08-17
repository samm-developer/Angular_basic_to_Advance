import { Injectable } from '@angular/core';
import { Task } from '../../lesson-03-component-communication/task.model';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  completedCount(tasks: Task[]): number {
    return tasks.filter((task) => task.done).length;
  }

  remainingCount(tasks: Task[]): number {
    return tasks.filter((task) => !task.done).length;
  }
}
