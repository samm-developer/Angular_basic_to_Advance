import { Component, inject } from '@angular/core';
import { TaskFormComponent } from '../lesson-03-component-communication/task-form/task-form.component';
import { NewTaskPayload } from '../lesson-03-component-communication/task-form/task-form.component';
import { TaskRowComponent } from '../lesson-03-component-communication/task-row/task-row.component';
import { TaskService } from './task.service';
import { TaskSummaryComponent } from './task-summary/task-summary.component';

/**
 * LESSON 4 — Services & dependency injection
 *
 * Instead of owning tasks[] here, we inject TaskService.
 * Any component can inject the same service and share the data.
 */
@Component({
  selector: 'app-lesson-04',
  imports: [TaskFormComponent, TaskRowComponent, TaskSummaryComponent],
  templateUrl: './lesson-04.component.html',
  styleUrl: './lesson-04.component.css',
})
export class Lesson04Component {
  protected readonly taskService = inject(TaskService);

  onAdd(payload: NewTaskPayload): void {
    this.taskService.addTask(payload);
  }

  onToggle(id: number): void {
    this.taskService.toggleTask(id);
  }

  onRemove(id: number): void {
    this.taskService.removeTask(id);
  }

  readonly injectExample = `// lesson-04.component.ts
protected readonly taskService = inject(TaskService);

onAdd(payload: NewTaskPayload): void {
  this.taskService.addTask(payload);
}`;

  readonly serviceExample = `@Injectable({ providedIn: 'root' })
export class TaskService {
  private _tasks: Task[] = [];

  addTask(payload: NewTaskPayload): void {
    this._tasks = [...this._tasks, { ... }];
  }
}`;
}
