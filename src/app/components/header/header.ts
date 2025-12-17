import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NgClass, AsyncPipe } from '@angular/common';
import { BehaviorSubject, filter, firstValueFrom, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserCourses } from '../../services/user-courses';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, NgClass, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  faBars: IconDefinition = faBars;
  isIconHidden: boolean = true;
  isMenuHidden: boolean = true;
  isUserAuthenticated$ = new BehaviorSubject<boolean>(false);
  isAdminAuthenticated$ = new BehaviorSubject<boolean>(false);
  private routerSub!: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private userCoursesService: UserCourses,
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.checkIsAuthCookie();
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.checkIsAuthCookie());
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  // Check presence of isAuth cookie and update related BehaviorSubject
  checkIsAuthCookie() {
    const isUserAuth = this.cookieService.check('isAuth');
    const isAdminAuth = this.cookieService.check('isAdmin');
    this.isUserAuthenticated$.next(isUserAuth);
    this.isAdminAuthenticated$.next(isAdminAuth);
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

  // Logout request
  async onClickLogout() {
    try {
      await firstValueFrom(
        this.http.get(environment.backUrl + '/api/authentification/deconnexion', {
          withCredentials: true,
        })
      );
      this.userCoursesService.reset();
      this.isUserAuthenticated$.next(false);
      this.isAdminAuthenticated$.next(false);
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error
      this.router.navigate(['/'], {
        queryParams: {
          success: false,
          message:
            'Nous ne sommes pas parvenus à vous déconnecter pour le moment, veuillez ré-essayer ultérieurement. Nous sommes désolé pour la gène occasionnée. Nous mettons tout en oeuvre pour solutionner le problème.',
        },
      });
    }
  }
}
