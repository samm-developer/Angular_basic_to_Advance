import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';

/**
 * Child component — receives data from parent via @Input,
 * sends events back via @Output.
 */
@Component({
  selector: 'app-task-row',
  imports: [DatePipe],
  templateUrl: './task-row.component.html',
  styleUrl: './task-row.component.css',
})
export class TaskRowComponent {
  @Input({ required: true }) task!: Task;

  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onToggle(): void {
    this.toggle.emit(this.task.id);
  }

  onRemove(): void {
    this.remove.emit(this.task.id);
  }
}
