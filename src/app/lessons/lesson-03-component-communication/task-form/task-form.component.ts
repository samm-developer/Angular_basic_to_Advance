import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface NewTaskPayload {
  title: string;
  dueDate: string;
}

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  title = '';
  dueDate = '';

  @Output() add = new EventEmitter<NewTaskPayload>();

  submit(): void {
    const title = this.title.trim();
    if (!title || !this.dueDate) {
      return;
    }

    this.add.emit({ title, dueDate: this.dueDate });
    this.title = '';
    this.dueDate = '';
  }
}
