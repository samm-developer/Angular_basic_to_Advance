import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { Task } from '../lesson-03-component-communication/task.model';
import { TaskApiService } from '../lesson-05-http/task-api.service';

export interface TasksViewModel {
  loading: boolean;
  tasks: Task[];
  error: string;
}

/**
 * LESSON 8 — RxJS & async pipe
 *
 * Lesson 5 used .subscribe() in the component.
 * Here we expose an Observable and let the template consume it with | async.
 */
@Component({
  selector: 'app-lesson-08',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './lesson-08.component.html',
  styleUrl: './lesson-08.component.css',
})
export class Lesson08Component {
  private readonly taskApi = inject(TaskApiService);
  private readonly reload$ = new Subject<void>();

  readonly viewModel$ = this.reload$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.taskApi.getTasks().pipe(
        map(
          (tasks): TasksViewModel => ({
            loading: false,
            tasks,
            error: '',
          }),
        ),
        startWith({ loading: true, tasks: [], error: '' }),
        catchError(() =>
          of({
            loading: false,
            tasks: [],
            error: 'Could not load tasks. Check your internet connection.',
          }),
        ),
      ),
    ),
  );

  reload(): void {
    this.reload$.next();
  }

  readonly asyncExample = `<!-- template -->
@if (viewModel$ | async; as vm) {
  @if (vm.loading) { Loading… }
  @else { {{ vm.tasks.length }} tasks }
}`;

  readonly pipeExample = `viewModel$ = this.reload$.pipe(
  startWith(void 0),
  switchMap(() => this.taskApi.getTasks().pipe(
    map(tasks => ({ loading: false, tasks, error: '' })),
    catchError(() => of({ loading: false, tasks: [], error: 'Failed' }))
  ))
);`;
}
