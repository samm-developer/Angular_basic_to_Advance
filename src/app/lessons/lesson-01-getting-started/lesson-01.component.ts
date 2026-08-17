import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * LESSON 1 — Getting Started
 *
 * A component is the smallest building block of an Angular UI.
 * It is a TypeScript class + an HTML template + optional CSS.
 *
 * The @Component decorator tells Angular:
 *   - selector: the HTML tag that renders this component
 *   - templateUrl: the view
 *   - styleUrl: styles that apply only to this view
 */
@Component({
  selector: 'app-lesson-01',
  imports: [CommonModule],
  templateUrl: './lesson-01.component.html',
  styleUrl: './lesson-01.component.css',
})
export class Lesson01Component {
  // --- Interpolation (shown in the template with {{ }}) ---
  studentName = 'Shashwat';
  framework = 'Angular';
  version = 19;

  // --- Event binding (methods called from (click) in the template) ---
  count = 0;

  increment(): void {
    this.count += 1;
  }

  decrement(): void {
    if (this.count > 0) {
      this.count -= 1;
    }
  }

  reset(): void {
    this.count = 0;
  }

  // --- Property binding (shown in the template with [property]="value") ---
  isLiked = false;

  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }
}
