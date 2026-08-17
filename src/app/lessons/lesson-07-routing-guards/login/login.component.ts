import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  username = '';
  password = '';
  error = '';

  submit(): void {
    const ok = this.auth.login(this.username.trim(), this.password);

    if (!ok) {
      this.error = 'Invalid credentials. Hint: student / angular';
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/lesson-7';
    this.router.navigateByUrl(returnUrl);
  }
}
