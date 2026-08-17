import { Component } from '@angular/core';
import { CounterComponent } from './demo/counter.component';

@Component({
  selector: 'app-lesson-11',
  imports: [CounterComponent],
  templateUrl: './lesson-11.component.html',
  styleUrl: './lesson-11.component.css',
})
export class Lesson11Component {
  readonly componentSpecHint = `// counter.component.spec.ts
fixture = TestBed.createComponent(CounterComponent);
button.click();
fixture.detectChanges();
expect(component.count).toBe(1);`;

  readonly serviceSpecHint = `// stats.service.spec.ts
service = TestBed.inject(StatsService);
expect(service.completedCount(tasks)).toBe(1);`;
}
