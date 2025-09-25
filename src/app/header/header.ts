import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NgClass } from "@angular/common";
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  faBars: IconDefinition = faBars;
  isIconHidden: boolean = true;
  isMenuHidden: boolean = true;

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit():void {
    this.onResize();
  }

  // Add event listener on window's size to hide/show menu and burger menu icon
  @HostListener('window:resize')
  onResize():void {
    this.isIconHidden = window.innerWidth >= 769;
    this.isMenuHidden = window.innerWidth < 769;
  }
  
  // Toggle hidden class on element 
  toggleElement(hiddenElementId: string):void {
    const hiddenElement: HTMLElement | null = document.getElementById(hiddenElementId);
    if (hiddenElementId === 'nav-menu' && hiddenElement?.classList.contains('hidden')) {
      hiddenElement?.classList.remove('hidden');
    }
    hiddenElement?.classList.toggle('smoothHidden');
  };

  // Logout request
  async onClickLogout() {
    try {
      await firstValueFrom(this.http.get(environment.backUrl + '/api/authentication/deconnexion', { withCredentials : true }));
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error
      this.router.navigate(['/'], {
        queryParams: {
          success: false,
          message: "Nous ne sommes pas parvenus à vous déconnecter pour le moment, veuillez ré-essayer ultérieurement. Nous sommes désolé pour la gène occasionnée. Nous mettons tout en oeuvre pour solutionner le problème.",
        }
      });
    }
  }
}
