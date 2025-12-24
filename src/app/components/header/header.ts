import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserCourses } from '../../services/user-courses';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(
    private router: Router,
    private userCoursesService: UserCourses,
    private authService: AuthenticationService,
  ) {}

  faBars: IconDefinition = faBars;
  isIconHidden: boolean = true;
  isMenuHidden: boolean = true;
  isUserAuthenticated: boolean = false;
  isAdminAuthenticated: boolean = false;
  userAuthSub!: Subscription;
  adminAuthSub!: Subscription;

  ngOnInit(): void {
    this.onResize();
    this.userAuthSub = this.authService.isAuthenticated$.subscribe(value => this.isUserAuthenticated = value);
    this.adminAuthSub = this.authService.isAdmin$.subscribe(value => this.isAdminAuthenticated = value);
  }

  ngOnDestroy(): void {
    this.userAuthSub.unsubscribe();
    this.adminAuthSub.unsubscribe();
  }

  // Add event listener on window's size to hide/show menu and burger menu icon
  @HostListener('window:resize')
  onResize(): void {
    this.isIconHidden = window.innerWidth >= 769;
    this.isMenuHidden = window.innerWidth < 769;
  }

  // Toggle hidden class on element
  toggleElement(hiddenElementId: string): void {
    const hiddenElement: HTMLElement | null = document.getElementById(hiddenElementId);
    if (hiddenElementId === 'nav-menu' && hiddenElement?.classList.contains('hidden')) {
      hiddenElement?.classList.remove('hidden');
    }
    hiddenElement?.classList.toggle('smoothHidden');
  }

  // Add smoothHidden class on element
  hideElement(elementId: string): void {
    const elementToHide: HTMLElement | null = document.getElementById(elementId);
    elementToHide?.classList.contains('smoothHidden') ? null : elementToHide?.classList.add('smoothHidden');
  }

  // Logout
  async onClickLogout() {
    this.userCoursesService.reset();
    this.authService.disconnected();
    this.router.navigate(['/']);
  }
}
