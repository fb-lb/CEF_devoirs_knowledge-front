import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, CursusData, ElementData, LessonData, ThemeData, UserData } from '../../../core/models/api-response.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretUp, faPen, faTrash, faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-office-contents',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
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

  addThemeGlobalErrorMessage: string = "";
  isAddThemeGlobalErrorMessageSuccess: boolean = true;

  addCursusGlobalErrorMessage: string = "";
  isAddCursusGlobalErrorMessageSuccess: boolean = true;

  addLessonGlobalErrorMessage: string = "";
  isAddLessonGlobalErrorMessageSuccess: boolean = true;

  addElementGlobalErrorMessage: string = "";
  isAddElementGlobalErrorMessageSuccess: boolean = true;

  private addElementTypeChangeSub?: Subscription;

  imagePreviewUrl: string | null = null;

  constructor(private http: HttpClient, public formService: FormService) {}

  async ngOnInit(): Promise<void> {
    // Subscription to type form control on add element form to add/remove required validator on other form control
    this.addElementTypeChangeSub = this.addElementForm.get('type')?.valueChanges.subscribe(value => {
      const textTypeControl = this.addElementForm.get('textType');
      const contentControl = this.addElementForm.get('content');
      const fileControl = this.addElementForm.get('file');
      const alternativeControl = this.addElementForm.get('alternative');

      if (value === 'text') {
        textTypeControl?.setValidators([Validators.required]);
        contentControl?.setValidators([Validators.required]);
      } else {
        textTypeControl?.clearValidators();
        contentControl?.clearValidators();

        textTypeControl?.updateValueAndValidity({ emitEvent: false });
        contentControl?.updateValueAndValidity({ emitEvent: false });
      }

      if (value === 'image') {
        fileControl?.setValidators([Validators.required]);
        alternativeControl?.setValidators([Validators.required, Validators.maxLength(255)]);
      } else {
        fileControl?.clearValidators();
        alternativeControl?.clearValidators();

        fileControl?.updateValueAndValidity({ emitEvent: false });
        alternativeControl?.updateValueAndValidity({ emitEvent: false });
      }
    });

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

  ngOnDestroy() {
    this.addElementTypeChangeSub?.unsubscribe();
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
    //if (this.currentThemeId !== id) this.activeThemeUpdateFormId = null;
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

  // ---------------------
  // ADD THEME FORM PART
  // ---------------------

  addThemeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.maxLength(255),
      Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ?!\/:'"(),.\-]*$/),
    ]),
  });

  async onSubmitAddThemeForm() {
    this.addThemeForm.markAllAsTouched();
    this.addThemeGlobalErrorMessage = "";

    if (this.addThemeForm.valid) {
      for (const theme of this.allThemes) {
        if (theme.name === this.addThemeForm.get('name')?.value) {
          this.isAddThemeGlobalErrorMessageSuccess = false;
          this.addThemeGlobalErrorMessage = "Un thème porte déjà ce nom, veuillez choisir un thème avec un nom différent.";
          return;
        }
      }

      try {
        const response = await firstValueFrom(this.http.post<ApiResponse<ThemeData[]>>(environment.backUrl + '/api/content/theme/add', this.addThemeForm.value, {withCredentials: true}));
        this.addThemeGlobalErrorMessage = response.message;
        this.isAddThemeGlobalErrorMessageSuccess = true;
        if (response.data) {
          this.allThemes = response.data.sort((a: ThemeData,b: ThemeData) => a.order - b.order);
          this.allThemes = this.addProperties(this.allThemes, this.allUsers) as ThemeData[];
        }
        this.addThemeForm.reset();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const response = error.error as ApiResponse;
          this.isAddThemeGlobalErrorMessageSuccess = response.success;
          this.addThemeGlobalErrorMessage = response.message;
        } else {
          this.isAddThemeGlobalErrorMessageSuccess = false;
          this.addThemeGlobalErrorMessage =
            "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.";
          console.error(error);
          // add external service like Sentry to save the error
        }
      }
    }
  }

  // ---------------------
  // ADD CURSUS FORM PART
  // ---------------------

  addCursusForm = new FormGroup({
    themeId: new FormControl(this.currentThemeId, [Validators.required]),
    name: new FormControl('', [
      Validators.required, 
      Validators.maxLength(255),
      Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ?!\/:'"(),.\-]*$/),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
  });

  async onSubmitAddCursusForm() {
    this.addCursusForm.patchValue({themeId: this.currentThemeId});
    this.addCursusForm.markAllAsTouched();
    this.addCursusGlobalErrorMessage = "";

    if (this.addCursusForm.valid) {
      for (const cursus of this.selectedCursus) {
        if (cursus.name === this.addCursusForm.get('name')?.value) {
          this.isAddCursusGlobalErrorMessageSuccess = false;
          this.addCursusGlobalErrorMessage = "Un cursus de ce thème porte déjà ce nom, veuillez choisir un cursus avec un nom différent.";
          return;
        }
      }

      try {
        const response = await firstValueFrom(this.http.post<ApiResponse<CursusData[]>>(environment.backUrl + '/api/content/cursus/add', this.addCursusForm.value, {withCredentials: true}));
        this.addCursusGlobalErrorMessage = response.message;
        this.isAddCursusGlobalErrorMessageSuccess = true;
        if (response.data) {
          this.allCursus = this.addProperties(response.data, this.allUsers) as CursusData[];
          if (this.currentThemeId) this.selectCursusToDisplay(this.currentThemeId);
        }
        this.addCursusForm.reset();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const response = error.error as ApiResponse;
          this.isAddCursusGlobalErrorMessageSuccess = response.success;
          this.addCursusGlobalErrorMessage = response.message;
        } else {
          this.isAddCursusGlobalErrorMessageSuccess = false;
          this.addCursusGlobalErrorMessage =
            "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.";
          console.error(error);
          // add external service like Sentry to save the error
        }
      }
    }
  }

  // ---------------------
  // ADD LESSON FORM PART
  // ---------------------

  addLessonForm = new FormGroup({
    cursusId: new FormControl(this.currentCursusId, [Validators.required]),
    name: new FormControl('', [
      Validators.required, 
      Validators.maxLength(255),
      Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9 ?!\/:'"(),.\-]*$/),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
  });

  async onSubmitAddLessonForm() {
    this.addLessonForm.patchValue({cursusId: this.currentCursusId});
    this.addLessonForm.markAllAsTouched();
    this.addLessonGlobalErrorMessage = "";

    if (this.addLessonForm.valid) {
      for (const lesson of this.selectedLessons) {
        if (lesson.name === this.addLessonForm.get('name')?.value) {
          this.isAddLessonGlobalErrorMessageSuccess = false;
          this.addLessonGlobalErrorMessage = "Une leçon de ce cursus porte déjà ce nom, veuillez choisir une leçon avec un nom différent.";
          return;
        }
      }

      try {
        const response = await firstValueFrom(this.http.post<ApiResponse<LessonData[]>>(environment.backUrl + '/api/content/lesson/add', this.addLessonForm.value, {withCredentials: true}));
        this.addLessonGlobalErrorMessage = response.message;
        this.isAddLessonGlobalErrorMessageSuccess = true;
        if (response.data) {
          this.allLessons = this.addProperties(response.data, this.allUsers) as LessonData[];
          if (this.currentCursusId) this.selectLessonsToDisplay(this.currentCursusId);
        }
        this.addLessonForm.reset();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const response = error.error as ApiResponse;
          this.isAddLessonGlobalErrorMessageSuccess = response.success;
          this.addLessonGlobalErrorMessage = response.message;
        } else {
          this.isAddLessonGlobalErrorMessageSuccess = false;
          this.addLessonGlobalErrorMessage =
            "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.";
          console.error(error);
          // add external service like Sentry to save the error
        }
      }
    }
  }

  // ---------------------
  // ADD ELEMENT FORM PART
  // ---------------------

  addElementForm = new FormGroup({
    lessonId: new FormControl(this.currentLessonId),
    type: new FormControl('', [Validators.required]),

    content: new FormControl(''),
    textType: new FormControl(''),

    file: new FormControl<File | null>(null),
    legend: new FormControl(''),
    alternative: new FormControl(''),
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0 ) return;

    const file = input.files[0];

    if (file.size > 5 * 1024 * 1024) {
      this.isAddElementGlobalErrorMessageSuccess = false;
      this.addElementGlobalErrorMessage = "La taille maximale autorisée pour le fichier est de 5 Mo.";
      return;
    }

    this.addElementForm.get('file')?.setValue(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string | null;
    };
    reader.readAsDataURL(file);
    
  }

  async onSubmitAddElementForm() {
    this.addElementForm.patchValue({lessonId: this.currentLessonId});
    this.addElementForm.markAllAsTouched();
    this.addElementGlobalErrorMessage = "";

    if (this.addElementForm.valid) {
      try {
        const formData = new FormData();
        formData.append('lessonId', this.currentLessonId?.toString() || '');
        formData.append('type', this.addElementForm.get('type')?.value || '');
        if (this.addElementForm.get('type')?.value === 'text') {
          formData.append('content', this.addElementForm.get('content')?.value || '');
          formData.append('textType', this.addElementForm.get('textType')?.value || '');
        }
        if (this.addElementForm.get('type')?.value === 'image') {
          formData.append('legend', this.addElementForm.get('legend')?.value || '');
          formData.append('alternative', this.addElementForm.get('alternative')?.value || '');
          
          const file = this.addElementForm.get('file')?.value;
          if (file) formData.append('file', file);
        }
        let response: ApiResponse<ElementData[]> = {success: true, message: '', data: []};
        if(this.addElementForm.get('type')?.value === 'image') response = await firstValueFrom(this.http.post<ApiResponse<ElementData[]>>(environment.backUrl + '/api/content/element/image/add', formData, {withCredentials: true}));
        if(this.addElementForm.get('type')?.value === 'text') response = await firstValueFrom(this.http.post<ApiResponse<ElementData[]>>(environment.backUrl + '/api/content/element/text/add', formData, {withCredentials: true}));
        
        this.addElementGlobalErrorMessage = response.message;
        this.isAddElementGlobalErrorMessageSuccess = true;
        if (response.data) {
          this.allElements = this.addProperties(response.data, this.allUsers) as ElementData[];
          if (this.currentLessonId) this.selectElementsToDisplay(this.currentLessonId);
        }
        this.addElementForm.reset();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const response = error.error as ApiResponse;
          this.isAddElementGlobalErrorMessageSuccess = response.success;
          this.addElementGlobalErrorMessage = response.message;
        } else {
          this.isAddElementGlobalErrorMessageSuccess = false;
          this.addElementGlobalErrorMessage =
            "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.";
          console.error(error);
          // add external service like Sentry to save the error
        }
      }
    }
  }


  // ------------------------------------------
  // DELETE THEME / CURSUS / LESSON / ELEMENT
  // ------------------------------------------

  async onDelete(type: 'theme' | 'cursus' | 'lesson' | 'element', id: number) {
    try {
      const response = await firstValueFrom(this.http.delete<ApiResponse>(environment.backUrl + `/api/content/${type}/${id}`, { withCredentials: true }));
      const newList = response.data ?? [];
      if(type === 'theme') {
        this.allThemes = newList.sort((a: ThemeData,b: ThemeData) => a.order - b.order);
        this.allThemes = this.addProperties(this.allThemes, this.allUsers) as ThemeData[];
        this.selectedCursus = [];
      }
      if(type === 'cursus') {
        this.allCursus = this.addProperties(newList, this.allUsers) as CursusData[];;
        if (this.currentThemeId) this.selectCursusToDisplay(this.currentThemeId);
        this.selectedLessons = [];
      }
      if(type === 'lesson') {
        this.allLessons = this.addProperties(newList, this.allUsers) as LessonData[];
        if (this.currentCursusId) this.selectLessonsToDisplay(this.currentCursusId);
        this.selectedElements = [];
      }
      if(type === 'element') {
        this.allElements = this.addProperties(newList, this.allUsers) as ElementData[];
        if(this.currentLessonId) this.selectElementsToDisplay(this.currentLessonId);
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const response = error.error as ApiResponse;
        alert(response.message);
      } else {
        alert("Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.");
        console.error(error);
        // add external service like Sentry to save the error
      }
    }
  }
}
