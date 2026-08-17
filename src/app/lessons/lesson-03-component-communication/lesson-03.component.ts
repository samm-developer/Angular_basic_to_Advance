import { Component } from '@angular/core';
import { Task } from './task.model';
import { TaskFormComponent, NewTaskPayload } from './task-form/task-form.component';
import { TaskRowComponent } from './task-row/task-row.component';

/**
 * LESSON 3 — Component communication
 *
 * Parent owns the data (tasks[]).
 * Children display UI and emit events back up.
 */
@Component({
  selector: 'app-lesson-03',
  imports: [TaskFormComponent, TaskRowComponent],
  templateUrl: './lesson-03.component.html',
  styleUrl: './lesson-03.component.css',
})
export class Lesson03Component {
  tasks: Task[] = [
    { id: 1, title: 'Study @Input in task-row.component.ts', dueDate: '2026-08-18', done: false },
    { id: 2, title: 'Study @Output in task-form.component.ts', dueDate: '2026-08-19', done: false },
    { id: 3, title: 'Wire parent handlers in this file', dueDate: '2026-08-20', done: false },
  ];

  private nextId = 4;

  onAdd(payload: NewTaskPayload): void {
    this.tasks = [
      ...this.tasks,
      {
        id: this.nextId++,
        title: payload.title,
        dueDate: payload.dueDate,
        done: false,
      },
    ];
  }

  onToggle(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
  }

  onRemove(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  readonly formOutputExample = `// child — task-form.component.ts
@Output() add = new EventEmitter<NewTaskPayload>();

// parent — lesson-03.component.html
<app-task-form (add)="onAdd($event)" />`;

  readonly inputExample = `// child — task-row.component.ts
@Input({ required: true }) task!: Task;`;

  readonly outputExample = `// child — task-row.component.ts
@Output() toggle = new EventEmitter<number>();

onToggle(): void {
  this.toggle.emit(this.task.id);
}`;

  readonly parentExample = `<!-- parent — lesson-03.component.html -->
<app-task-row
  [task]="task"
  (toggle)="onToggle($event)"
  (remove)="onRemove($event)"
/>`;
}
