import { Component, inject } from '@angular/core';
import { TaskService } from '../task.service';

/**
 * This child injects the same TaskService as the parent —
 * no @Input needed to show shared stats.
 */
@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrl: './task-summary.component.css',
})
export class TaskSummaryComponent {
  protected readonly taskService = inject(TaskService);
}
