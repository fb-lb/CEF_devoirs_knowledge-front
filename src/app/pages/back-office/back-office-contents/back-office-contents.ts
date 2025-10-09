import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, CursusData, ElementData, LessonData, ThemeData } from '../../../core/models/api-response.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretUp, faPen, faTrash, faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-office-contents',
  imports: [FontAwesomeModule],
  templateUrl: './back-office-contents.html',
  styleUrl: './back-office-contents.scss'
})
export class BackOfficeContents {
  faPen: IconDefinition = faPen;
  faTrash: IconDefinition = faTrash;
  faCaretUp: IconDefinition = faCaretUp;
  faCaretDown: IconDefinition = faCaretDown;

  allThemes: ThemeData[] = [];
  allCursus: CursusData[] = [];
  allLessons: LessonData[] = [];
  allElements: ElementData[] = [];

  activeThemeId: number | null = null;
  activeCursusId: number | null = null;
  activeLessonId: number | null = null;

  selectedCursus: CursusData[] = [];
  selectedLessons: LessonData[] = [];

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    try {
      // Themes retrieval, in order
      const responseTheme = await firstValueFrom(this.http.get<ApiResponse<ThemeData[]>>(environment.backUrl + '/api/content/theme/all', { withCredentials: true }));
      if (responseTheme.data) this.allThemes = responseTheme.data.sort((a,b) => a.order - b.order);

      // Cursus retrieval
      const responseCursus = await firstValueFrom(this.http.get<ApiResponse<CursusData[]>>(environment.backUrl + '/api/content/cursus/all', { withCredentials: true }));
      if (responseCursus.data) this.allCursus = responseCursus.data;

      // Lessons retrieval
      const responseLesson = await firstValueFrom(this.http.get<ApiResponse<LessonData[]>>(environment.backUrl + '/api/content/lesson/all', { withCredentials: true }));
      if (responseLesson.data) this.allLessons = responseLesson.data;

      // Elements retrieval
      const responseElement = await firstValueFrom(this.http.get<ApiResponse<ElementData[]>>(environment.backUrl + '/api/content/element/all', { withCredentials: true }));
      if (responseElement.data) this.allElements = responseElement.data;
    } catch (error) {
      alert('Nous ne parvenons pas à nous connecter au serveur. Veuillez nous excuser pour la gène occasionnée.');
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  activeTheme(id: number | null) {
    this.activeThemeId = id;
    if (id) this.activeCursus(null);
    if (id) this.activeLesson(null);
    
    if (id) this.selectCursusToDisplay(id);
    if (id) this.selectedLessons = [];
  }

  activeCursus(id: number | null) {
    this.activeCursusId = id;
    if (id) this.activeTheme(null);
    if (id) this.activeLesson(null);

    if (id) this.selectLessonsToDisplay(id);
  }

  activeLesson(id: number | null) {
    this.activeLessonId = id;
    if (id) this.activeTheme(null);
    if (id) this.activeCursus(null);
  }

  selectCursusToDisplay(themeId: number) {
    this.selectedCursus = this.allCursus.filter(cursus => cursus.themeId === themeId);
    this.selectedCursus = this.selectedCursus.sort((a, b) => a.order - b.order);
  }

  selectLessonsToDisplay(cursusId: number) {
    this.selectedLessons = this.allLessons.filter(lesson => lesson.cursusId === cursusId);
    this.selectedLessons = this.selectedLessons.sort((a, b) => a.order - b.order);
  }

  async changeOrder(event: Event, type: 'theme' | 'cursus' | 'lesson' | 'element', id: number, move: 'up' | 'down') {
    event.stopPropagation();

    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<any>>(environment.backUrl + `/api/content/${type}/${id}/${move}`, { withCredentials: true }));
      const newList = response.data ?? [];
      if(type === 'theme') this.allThemes = newList.sort((a: ThemeData,b: ThemeData) => a.order - b.order);
      if(type === 'cursus') this.allCursus = newList;
      if(type === 'lesson') this.allLessons = newList;
      if(type === 'element') this.allElements = newList;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const response = error.error as ApiResponse;
        response.message ? alert(response.message) : alert('Nous ne parvenons pas à nous connecter à notre serveur, veuillez nous excuser pour la gène occasionnée.');
        console.error(error);
        // add external service like Sentry to save the error
      } else {
        alert('Nous ne parvenons pas à nous connecter à notre serveur, veuillez nous excuser pour la gène occasionnée.');
        console.error(error);
        // add external service like Sentry to save the error
      }
    }

  }
}
