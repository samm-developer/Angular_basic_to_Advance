import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-lesson-07',
  templateUrl: './lesson-07.component.html',
  styleUrl: './lesson-07.component.css',
})
export class Lesson07Component {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/lesson-7' } });
  }

  readonly guardExample = `// app.routes.ts
{ path: 'lesson-7', component: Lesson07Component, canActivate: [authGuard] }

// auth.guard.ts
export const authGuard: CanActivateFn = () => {
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};`;
}
