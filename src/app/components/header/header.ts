import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../services/token-service';
import { AuthService } from '../../services/auth-service';
import { MovieSvgComponent } from '../svg/movie-svg/movie-svg.component';
import { UserSvgComponent } from '../svg/user-svg/user-svg.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MovieSvgComponent, UserSvgComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  isUser = signal<boolean>(false);

  ngOnInit(): void {
    this.updateAuthStatus();
    this.authService.authStatusChanged.subscribe(() => {
      this.updateAuthStatus();
    });
  }

  updateAuthStatus(): void {
    this.isUser.set(!this.tokenService.isAuthTokenExpired());
  }

  onLogout(): void {
    this.authService.logout();
  }

}
