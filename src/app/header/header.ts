import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NgClass } from "@angular/common";

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
}
