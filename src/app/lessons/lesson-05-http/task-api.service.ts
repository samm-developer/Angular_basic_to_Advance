import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../lesson-03-component-communication/task.model';

/**
 * Service that loads tasks over HTTP.
 * getTasks() returns an Observable — data arrives asynchronously.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private readonly http = inject(HttpClient);
  private readonly url = '/lessons/tasks.json';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }
}
