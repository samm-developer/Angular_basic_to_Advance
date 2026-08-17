import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../lesson-03-component-communication/task.model';
import { TaskRowComponent } from '../lesson-03-component-communication/task-row/task-row.component';
import { TaskApiService } from './task-api.service';

/**
 * LESSON 5 — HTTP & Observables
 *
 * Data is loaded from a JSON file via HttpClient.
 * The response is an Observable — we subscribe to get the values.
 */
@Component({
  selector: 'app-lesson-05',
  imports: [TaskRowComponent],
  templateUrl: './lesson-05.component.html',
  styleUrl: './lesson-05.component.css',
})
export class Lesson05Component implements OnInit {
  private readonly taskApi = inject(TaskApiService);

  tasks: Task[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';

    this.taskApi.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load tasks. Check the network or JSON file.';
        this.loading = false;
      },
    });
  }

  onToggle(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
  }

  onRemove(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  readonly httpExample = `// task-api.service.ts
getTasks(): Observable<Task[]> {
  return this.http.get<Task[]>('/lessons/tasks.json');
}`;

  readonly subscribeExample = `// lesson-05.component.ts
this.taskApi.getTasks().subscribe({
  next: (tasks) => this.tasks = tasks,
  error: () => this.error = 'Failed to load',
});`;
}
