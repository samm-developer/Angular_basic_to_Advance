import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at count 0', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="count"]')?.textContent).toContain('0');
  });

  it('should increment when + is clicked', () => {
    const el: HTMLElement = fixture.nativeElement;
    const button = el.querySelector('[data-testid="inc"]') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(component.count).toBe(1);
    expect(el.querySelector('[data-testid="count"]')?.textContent).toContain('1');
  });

  it('should not go below 0', () => {
    component.decrement();
    fixture.detectChanges();
    expect(component.count).toBe(0);
  });
});
