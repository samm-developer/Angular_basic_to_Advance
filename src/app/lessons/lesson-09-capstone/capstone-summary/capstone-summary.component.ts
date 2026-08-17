import { Component, inject } from '@angular/core';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-capstone-summary',
  templateUrl: './capstone-summary.component.html',
  styleUrl: './capstone-summary.component.css',
})
export class CapstoneSummaryComponent {
  protected readonly taskManager = inject(TaskManagerService);
}
