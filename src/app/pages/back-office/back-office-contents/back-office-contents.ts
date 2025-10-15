import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, CursusData, ElementData, LessonData, ThemeData, UserData } from '../../../core/models/api-response.model';
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
  allUsers: UserData[] = [];

  selectedCursus: CursusData[] = [];
  selectedLessons: LessonData[] = [];
  selectedElements: ElementData[] = [];

  activeThemeId: number | null = null;
  activeCursusId: number | null = null;
  activeLessonId: number | null = null;
  activeElementId: number | null = null;
  activeUpdateFormId: number | null = null;

  currentThemeId: number | null = null;
  currentCursusId: number | null = null;
  currentLessonId: number | null = null;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    try {
      // Users retrieval
      const responseUser = await firstValueFrom(this.http.get<ApiResponse<UserData[]>>(environment.backUrl + '/api/utilisateurs/tous', { withCredentials: true }));
      if (responseUser.data) this.allUsers = responseUser.data;

      // Themes retrieval, in order
      const responseTheme = await firstValueFrom(this.http.get<ApiResponse<ThemeData[]>>(environment.backUrl + '/api/content/theme/all', { withCredentials: true }));
      if (responseTheme.data) {
        this.allThemes = responseTheme.data.sort((a,b) => a.order - b.order);
        this.allThemes = this.addProperties(this.allThemes, this.allUsers) as ThemeData[];
      }

      // Cursus retrieval
      const responseCursus = await firstValueFrom(this.http.get<ApiResponse<CursusData[]>>(environment.backUrl + '/api/content/cursus/all', { withCredentials: true }));
      if (responseCursus.data) this.allCursus = this.addProperties(responseCursus.data, this.allUsers) as CursusData[];

      // Lessons retrieval
      const responseLesson = await firstValueFrom(this.http.get<ApiResponse<LessonData[]>>(environment.backUrl + '/api/content/lesson/all', { withCredentials: true }));
      if (responseLesson.data) this.allLessons = this.addProperties(responseLesson.data, this.allUsers) as LessonData[];

      // Elements retrieval
      const responseElement = await firstValueFrom(this.http.get<ApiResponse<ElementData[]>>(environment.backUrl + '/api/content/element/all', { withCredentials: true }));
      if (responseElement.data) this.allElements = this.addProperties(responseElement.data, this.allUsers) as ElementData[];
    } catch (error) {
      alert('Nous ne parvenons pas à nous connecter au serveur. Veuillez nous excuser pour la gène occasionnée.');
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // Add createdAtDate, createdAtTime, updatedAtDate, updatedAtTime, createdByName, updatedByName properties
  // AllElements can be an array of ThemeData, CursusData, LessonData or
  addProperties(allElements: ThemeData[] | CursusData[] | LessonData[] | ElementData[], allUsers: UserData[]): ThemeData[] | CursusData[] | LessonData[] | ElementData[] {
    allElements.forEach(element => {
      const createdAtArray = element.createdAt.split(' ');
      const createdAtDate = createdAtArray.at(0);
      if(createdAtDate) element.createdAtDate = createdAtDate;
      const createdAtTime = createdAtArray.at(1);
      if(createdAtTime) element.createdAtTime = createdAtTime;

      const updatedAtArray = element.updatedAt.split(' ');
      const updatedAtDate = updatedAtArray.at(0);
      if (updatedAtDate) element.updatedAtDate = updatedAtDate;
      const updatedAtTime = updatedAtArray.at(1);
      if (updatedAtTime) element.updatedAtTime = updatedAtTime;

      if (element.createdBy) {
       const userWhoCreated = allUsers.find(user => user.id === element.createdBy);
       if (userWhoCreated) element.createdByName = userWhoCreated.firstName + ' ' + userWhoCreated.lastName + ' (' + userWhoCreated.id + ')';
      } else {
        element.createdByName = 'Inconnu';
      }

      if (element.updatedBy) {
        const userWhoUpdated = allUsers.find(user => user.id === element.updatedBy);
        if (userWhoUpdated) element.updatedByName = userWhoUpdated.firstName + ' ' + userWhoUpdated.lastName + ' (' + userWhoUpdated.id + ')';
      } else {
        element.updatedByName = 'Inconnu';
      }
    });
    return allElements;
  }

  activeTheme(id: number | null) {
    this.activeThemeId = id;
    this.activeUpdateFormId = null;
    if (id) {
      this.currentThemeId = id;
      this.currentCursusId = null;
      this.currentLessonId = null;

      this.activeCursus(null);
      this.activeLesson(null);
      this.activeElement(null);
      
      this.selectCursusToDisplay(id);
      this.selectedLessons = [];
      this.selectedElements = [];
    }
  }

  activeCursus(id: number | null) {
    this.activeCursusId = id;
    this.activeUpdateFormId = null;
    if (id) {
      this.currentCursusId = id;
      this.currentLessonId = null;

      this.activeTheme(null);
      this.activeLesson(null);
      this.activeElement(null);
      
      this.selectLessonsToDisplay(id);
      this.selectedElements = [];
    }
  }

  activeLesson(id: number | null) {
    this.activeLessonId = id;
    this.activeUpdateFormId = null;
    if (id) {
      this.currentLessonId = id;

      this.activeTheme(null);
      this.activeCursus(null);
      this.activeElement(null);

      this.selectElementsToDisplay(id);
    }
  }

  activeElement(id: number | null) {
    this.activeElementId = id;
    this.activeUpdateFormId = null;
    if (id) {

      this.activeTheme(null);
      this.activeCursus(null);
      this.activeLesson(null);
    }
  }

  activeUpdateForm(event: Event,id: number | null) {
    event.stopPropagation();
    this.activeUpdateFormId !== id ? this.activeUpdateFormId = id : this.activeUpdateFormId = null;
  }

  selectCursusToDisplay(themeId: number) {
    this.selectedCursus = this.allCursus.filter(cursus => cursus.themeId === themeId);
    this.selectedCursus = this.selectedCursus.sort((a, b) => a.order - b.order);
  }

  selectLessonsToDisplay(cursusId: number) {
    this.selectedLessons = this.allLessons.filter(lesson => lesson.cursusId === cursusId);
    this.selectedLessons = this.selectedLessons.sort((a, b) => a.order - b.order);
  }

  selectElementsToDisplay(lessonId: number) {
    this.selectedElements = this.allElements.filter(element => element.lessonId === lessonId);
    this.selectedElements = this.selectedElements.sort((a, b) => a.order - b.order);
  }

  async changeOrder(event: Event, type: 'theme' | 'cursus' | 'lesson' | 'element', id: number, move: 'up' | 'down') {
    event.stopPropagation();

    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<any>>(environment.backUrl + `/api/content/${type}/${id}/${move}`, { withCredentials: true }));
      const newList = response.data ?? [];
      if(type === 'theme') {
        this.allThemes = newList.sort((a: ThemeData,b: ThemeData) => a.order - b.order);
        this.allThemes = this.addProperties(this.allThemes, this.allUsers) as ThemeData[];
      }
      if(type === 'cursus') {
        this.allCursus = this.addProperties(newList, this.allUsers) as CursusData[];;
        if (this.currentThemeId) this.selectCursusToDisplay(this.currentThemeId);
      }
      if(type === 'lesson') {
        this.allLessons = this.addProperties(newList, this.allUsers) as LessonData[];
        if (this.currentCursusId) this.selectLessonsToDisplay(this.currentCursusId);
      }
      if(type === 'element') {
        this.allElements = this.addProperties(newList, this.allUsers) as ElementData[];
        if(this.currentLessonId) this.selectElementsToDisplay(this.currentLessonId);
      }
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
