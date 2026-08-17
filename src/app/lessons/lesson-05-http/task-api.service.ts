import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../lesson-03-component-communication/task.model';

/** Shape returned by JSONPlaceholder /todos */
interface TodoDto {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

/**
 * Loads tasks from JSONPlaceholder — a free dummy REST API.
 * https://jsonplaceholder.typicode.com
 */
@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  getTasks(): Observable<Task[]> {
    return this.http
      .get<TodoDto[]>(`${this.baseUrl}/todos`, {
        params: { _limit: '8' },
      })
      .pipe(map((todos) => todos.map((todo) => this.toTask(todo))));
  }

  private toTask(todo: TodoDto): Task {
    const due = new Date();
    due.setDate(due.getDate() + todo.id);

    return {
      id: todo.id,
      title: todo.title,
      dueDate: due.toISOString().slice(0, 10),
      done: todo.completed,
    };
  }
}
