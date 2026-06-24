import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { AuthenticationService } from './services/authentication.service';
import { CoursesService } from './services/courses.service.ts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  constructor(private authService: AuthenticationService, private coursesService: CoursesService){};

  ngOnInit() {
    this.authService.init();
  }
}
