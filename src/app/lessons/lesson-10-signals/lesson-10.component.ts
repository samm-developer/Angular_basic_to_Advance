import { DatePipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../lesson-03-component-communication/task.model';

type Filter = 'all' | 'open' | 'done';

/**
 * LESSON 10 — Signals
 *
 * Signals are Angular's fine-grained reactive state primitive.
 * - signal(): writable state
 * - computed(): derived/read-only state
 * - effect(): side effects when state changes
 */
@Component({
  selector: 'app-lesson-10',
  imports: [FormsModule, DatePipe],
  templateUrl: './lesson-10.component.html',
  styleUrl: './lesson-10.component.css',
})
export class Lesson10Component {
  newTitle = '';
  newDueDate = '';

  private nextId = 4;

  readonly tasks = signal<Task[]>([
    { id: 1, title: 'Learn signal() basics', dueDate: '2026-08-21', done: false },
    { id: 2, title: 'Understand computed()', dueDate: '2026-08-22', done: true },
    { id: 3, title: 'Practice effect() logging', dueDate: '2026-08-23', done: false },
  ]);

  readonly filter = signal<Filter>('all');

  readonly totalCount = computed(() => this.tasks().length);
  readonly doneCount = computed(() => this.tasks().filter((task) => task.done).length);
  readonly openCount = computed(() => this.totalCount() - this.doneCount());

  readonly visibleTasks = computed(() => {
    const mode = this.filter();
    const list = this.tasks();

    if (mode === 'open') {
      return list.filter((task) => !task.done);
    }

    if (mode === 'done') {
      return list.filter((task) => task.done);
    }

    return list;
  });

  readonly debugEffect = effect(() => {
    console.log('[Lesson10] filter:', this.filter(), 'visible:', this.visibleTasks().length);
  });

  setFilter(mode: Filter): void {
    this.filter.set(mode);
  }

  addTask(): void {
    const title = this.newTitle.trim();
    if (!title || !this.newDueDate) {
      return;
    }

    this.tasks.update((current) => [
      ...current,
      {
        id: this.nextId++,
        title,
        dueDate: this.newDueDate,
        done: false,
      },
    ]);

    this.newTitle = '';
    this.newDueDate = '';
  }

  toggleTask(id: number): void {
    this.tasks.update((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  removeTask(id: number): void {
    this.tasks.update((current) => current.filter((task) => task.id !== id));
  }
}
