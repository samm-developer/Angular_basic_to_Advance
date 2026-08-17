import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedIn = signal(false);

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  login(username: string, password: string): boolean {
    const ok = username === 'student' && password === 'angular';
    this.loggedIn.set(ok);
    return ok;
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}
