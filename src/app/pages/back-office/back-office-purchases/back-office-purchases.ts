import { Component } from '@angular/core';
import { ApiResponse, CursusData, LessonData, ThemeData, UserCursusData, UserData, UserLessonData, UserThemeData } from '../../../core/models/api-response.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { NgClass } from '@angular/common';
import { UserCourses } from '../../../services/user-courses';

@Component({
  selector: 'app-back-office-purchases',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, NgClass],
  templateUrl: './back-office-purchases.html',
  styleUrl: './back-office-purchases.scss'
})
export class BackOfficePurchases {
  allUsers: UserData[] = [];

  allThemes: ThemeData[] = [];
  allUserThemes: UserThemeData[] = [];
  filteredUserThemes: UserThemeData[] = [];

  allCursus: CursusData[] = [];
  allUserCursus: UserCursusData[] = [];
  filteredUserCursus: UserCursusData[] = [];

  allLessons: LessonData[] = [];
  allUserLessons: UserLessonData[] = [];
  filteredUserLessons: UserLessonData[] = [];

  userNameOfUserCursusToAdd: string = '';
  userEmailOfUserCursusToAdd: string = '';
  cursusNameOfUserCursusToAdd: string = '';
  addUserCursusMessageUser: string = '';
  isAddUserCursusMessageUserSuccess: boolean = true;
  addUserCursusMessageCursus: string = '';
  isAddUserCursusMessageCursusSuccess: boolean = true;

  userNameOfUserLessonToAdd: string = '';
  userEmailOfUserLessonToAdd: string = '';
  lessonNameOfUserLessonToAdd: string = '';
  addUserLessonMessageUser: string = '';
  isAddUserLessonMessageUserSuccess: boolean = true;
  addUserLessonMessageLesson: string = '';
  isAddUserLessonMessageLessonSuccess: boolean = true;

  isUpdateUserThemeCertified: boolean = false;
  userNameOfUserThemeToUpdate: string = '';
  userEmailOfUserThemeToUpdate: string = '';
  themeNameOfUserThemeToUpdate: string = '';
  updateUserThemeMessage: string = '';
  isUpdateUserThemeMessageSuccess: boolean = true;

  isUpdateUserCursusValidated: boolean = false;
  userNameOfUserCursusToUpdate: string = '';
  userEmailOfUserCursusToUpdate: string = '';
  cursusNameOfUserCursusToUpdate: string = '';
  updateUserCursusMessage: string = '';
  isUpdateUserCursusMessageSuccess: boolean = true;

  isUpdateUserLessonValidated: boolean = false;
  userNameOfUserLessonToUpdate: string = '';
  userEmailOfUserLessonToUpdate: string = '';
  lessonNameOfUserLessonToUpdate: string = '';
  updateUserLessonMessage: string = '';
  isUpdateUserLessonMessageSuccess: boolean = true;

  userNameOfUserThemeToDelete: string = '';
  userEmailOfUserThemeToDelete: string = '';
  themeNameOfUserThemeToDelete: string = '';
  deleteUserThemeMessage: string = '';
  isDeleteUserThemeMessageSuccess: boolean = true;

  userNameOfUserCursusToDelete: string = '';
  userEmailOfUserCursusToDelete: string = '';
  cursusNameOfUserCursusToDelete: string = '';
  deleteUserCursusMessage: string = '';
  isDeleteUserCursusMessageSuccess: boolean = true;

  userNameOfUserLessonToDelete: string = '';
  userEmailOfUserLessonToDelete: string = '';
  lessonNameOfUserLessonToDelete: string = '';
  deleteUserLessonMessage: string = '';
  isDeleteUserLessonMessageSuccess: boolean = true;

  constructor(private http: HttpClient, public formService: FormService, private userCoursesService: UserCourses) {}

  async ngOnInit() {
    try {
      const getAllUsersReponse = await firstValueFrom(this.http.get<ApiResponse<UserData[]>>(environment.backUrl + '/api/utilisateurs/tous', { withCredentials: true }));
      if (getAllUsersReponse.data) this.allUsers = getAllUsersReponse.data;

      const getAllThemesResponse = await firstValueFrom(this.http.get<ApiResponse<ThemeData[]>>(environment.backUrl + '/api/content/theme/all', { withCredentials: true }));
      if (getAllThemesResponse.data) this.allThemes = getAllThemesResponse.data;

      const getAllCursusResponse = await firstValueFrom(this.http.get<ApiResponse<CursusData[]>>(environment.backUrl + '/api/content/cursus/all', { withCredentials: true }));
      if (getAllCursusResponse.data) this.allCursus = getAllCursusResponse.data;

      const getAllLessonsResponse = await firstValueFrom(this.http.get<ApiResponse<LessonData[]>>(environment.backUrl + '/api/content/lesson/all', { withCredentials: true }));
      if (getAllLessonsResponse.data) this.allLessons = getAllLessonsResponse.data;

      await this.syncAllUserCoursesData();
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error
      if(error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        errorResponse.message ? alert(errorResponse.message) : alert('Nous ne parvenons pas à nous connecter à notre serveur, veuillez nous excuser pour la gène occasionnée. Nous mettons tout en oeuvre pour solutionner le problème.');
      } else {
        alert('Nous ne parvenons pas à nous connecter à notre serveur, veuillez nous excuser pour la gène occasionnée. Nous mettons tout en oeuvre pour solutionner le problème.');
      }
    }
  }

  async syncAllUserCoursesData() {
    const getAllUserThemeResponse = await firstValueFrom(this.http.get<ApiResponse<UserThemeData[]>>(environment.backUrl + '/api/user-theme/all', { withCredentials: true }));
    if (getAllUserThemeResponse.data) {
      this.allUserThemes = getAllUserThemeResponse.data;
      this.filteredUserThemes = getAllUserThemeResponse.data;
    }

    const getAllUserCursusResponse = await firstValueFrom(this.http.get<ApiResponse<UserCursusData[]>>(environment.backUrl + '/api/user-cursus/all', { withCredentials: true }));
    if (getAllUserCursusResponse.data) {
      this.allUserCursus = getAllUserCursusResponse.data;
      this.filteredUserCursus = getAllUserCursusResponse.data;
    }

    const getAllUserLessonResponse = await firstValueFrom(this.http.get<ApiResponse<UserLessonData[]>>(environment.backUrl + '/api/user-lesson/all', { withCredentials: true }));
    if (getAllUserLessonResponse.data) {
      this.allUserLessons = getAllUserLessonResponse.data;
      this.filteredUserLessons = getAllUserLessonResponse.data;
    }
  }

  getUserName(userId: number): string {
    const user = this.allUsers.find(user => user.id === userId);
    if (user) {
      return `${user.firstName}  ${user.lastName} (${user.id})`;
    } else {
      return 'Utilisateur introuvable';
    }
  }

  getFormatedDate(date: string): string {
    const dateSplited = date.split(' ');
    const time = dateSplited.pop();
    dateSplited.push('à');
    if (time) dateSplited.push(time);
    const formatedDate = dateSplited.join(' ');
    return formatedDate;
  }

  // ----------------------
  // ADD USER CURSUS
  // ----------------------

  addUserCursusForm = new FormGroup({
    userId: new FormControl(null, [Validators.required, Validators.min(1)]),
    cursusId: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  onChangeAddFormUserCursusUserId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const userId = Number(input.value);
    const errors = this.addUserCursusForm.errors;
    if (errors) {
      delete errors['forceUserIdError'];
      this.addUserCursusForm.setErrors(Object.keys(errors).length ? errors : null);
    }
    this.addUserCursusMessageUser = "";

    if (userId > 0) {
      const user = this.allUsers.find(user => user.id === userId);
      
      if(!user) {
        this.userNameOfUserCursusToAdd = '';
        this.userEmailOfUserCursusToAdd = '';

        this.addUserCursusMessageUser = "Cet identifiant ne correspond à aucun utilisateur.";
        this.isAddUserCursusMessageUserSuccess = false;
        this.addUserCursusForm.setErrors({forceUserIdError: true});
        return
      };

      this.userNameOfUserCursusToAdd = this.getUserName(user.id);
      this.userEmailOfUserCursusToAdd = user.email;
    } else {
      this.userNameOfUserCursusToAdd = '';
      this.userEmailOfUserCursusToAdd = '';
    }
  }

  onChangeAddFormUserCursusCursusId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const cursusId = Number(input.value);
    const errors = this.addUserCursusForm.errors;
    if (errors) {
      delete errors['forceCursusIdError'];
      this.addUserCursusForm.setErrors(Object.keys(errors).length ? errors : null);
    }
    this.addUserCursusMessageCursus = "";

    if (cursusId > 0) {
      const cursus = this.allCursus.find(cursus => cursus.id === cursusId);
      
      if(!cursus) {
        this.cursusNameOfUserCursusToAdd = '';

        this.addUserCursusMessageCursus = "Cet identifiant ne correspond à aucun cursus.";
        this.isAddUserCursusMessageCursusSuccess = false;
        this.addUserCursusForm.setErrors({forceCursusIdError: true});
        return
      };

      this.cursusNameOfUserCursusToAdd = this.getCursusName(cursus.id);
    } else {
      this.cursusNameOfUserCursusToAdd = '';
    }
  }

  async onSubmitUserCursusAddForm() {
    this.addUserCursusForm.markAllAsDirty();
    if(this.addUserCursusForm.invalid) {
      this.isAddUserCursusMessageUserSuccess = false;
      this.addUserCursusMessageUser = "Le formulaire n'est pas valide.";
      return;
    }

    try {
      const body = {
        courseId: this.addUserCursusForm.controls.cursusId.value,
        userId: this.addUserCursusForm.controls.userId.value,
      }
      const addUserCursusResponse = await firstValueFrom(this.http.post<ApiResponse>(environment.backUrl + '/api/user-cursus/add', body, {withCredentials: true}));
      this.isAddUserCursusMessageUserSuccess = addUserCursusResponse.success;
      this.addUserCursusMessageUser = addUserCursusResponse.message;
      if (addUserCursusResponse.success) {
        this.addUserCursusForm.reset();
        this.userNameOfUserCursusToAdd = '';
        this.userEmailOfUserCursusToAdd = '';
        this.cursusNameOfUserCursusToAdd = '';
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.isAddUserCursusMessageUserSuccess = errorResponse.success;
        this.addUserCursusMessageUser = errorResponse.message;
      } else {
        this.isAddUserCursusMessageUserSuccess = false;
        this.addUserCursusMessageUser = "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.";
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // ADD USER LESSON
  // ----------------------

  addUserLessonForm = new FormGroup({
    userId: new FormControl(null, [Validators.required, Validators.min(1)]),
    lessonId: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  onChangeAddFormUserLessonUserId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const userId = Number(input.value);
    const errors = this.addUserLessonForm.errors;
    if (errors) {
      delete errors['forceUserIdError'];
      this.addUserLessonForm.setErrors(Object.keys(errors).length ? errors : null);
    }
    this.addUserLessonMessageUser = "";

    if (userId > 0) {
      const user = this.allUsers.find(user => user.id === userId);
      
      if(!user) {
        this.userNameOfUserLessonToAdd = '';
        this.userEmailOfUserLessonToAdd = '';

        this.addUserLessonMessageUser = "Cet identifiant ne correspond à aucun utilisateur.";
        this.isAddUserLessonMessageUserSuccess = false;
        this.addUserLessonForm.setErrors({forceUserIdError: true});
        return
      };

      this.userNameOfUserLessonToAdd = this.getUserName(user.id);
      this.userEmailOfUserLessonToAdd = user.email;
    } else {
      this.userNameOfUserLessonToAdd = '';
      this.userEmailOfUserLessonToAdd = '';
    }
  }

  onChangeAddFormUserLessonLessonId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const lessonId = Number(input.value);
    const errors = this.addUserLessonForm.errors;
    if (errors) {
      delete errors['forceLessonIdError'];
      this.addUserLessonForm.setErrors(Object.keys(errors).length ? errors : null);
    }
    this.addUserLessonMessageLesson = "";

    if (lessonId > 0) {
      const lesson = this.allLessons.find(lesson => lesson.id === lessonId);
      
      if(!lesson) {
        this.lessonNameOfUserLessonToAdd = '';

        this.addUserLessonMessageLesson = "Cet identifiant ne correspond à aucune leçon.";
        this.isAddUserLessonMessageLessonSuccess = false;
        this.addUserLessonForm.setErrors({forceLessonIdError: true});
        return
      };

      this.lessonNameOfUserLessonToAdd = this.getLessonName(lesson.id);
    } else {
      this.lessonNameOfUserLessonToAdd = '';
    }
  }

  async onSubmitUserLessonAddForm() {
    this.addUserLessonForm.markAllAsDirty();
    if(this.addUserLessonForm.invalid) {
      this.isAddUserLessonMessageUserSuccess = false;
      this.addUserLessonMessageUser = "Le formulaire n'est pas valide.";
      return;
    }

    try {
      const body = {
        courseId: this.addUserLessonForm.controls.lessonId.value,
        userId: this.addUserLessonForm.controls.userId.value,
      }
      const addUserLessonResponse = await firstValueFrom(this.http.post<ApiResponse>(environment.backUrl + '/api/user-lesson/add', body, {withCredentials: true}));
      this.isAddUserLessonMessageUserSuccess = addUserLessonResponse.success;
      this.addUserLessonMessageUser = addUserLessonResponse.message;
      if (addUserLessonResponse.success) {
        this.addUserLessonForm.reset();
        this.userNameOfUserLessonToAdd = '';
        this.userEmailOfUserLessonToAdd = '';
        this.lessonNameOfUserLessonToAdd = '';
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.isAddUserLessonMessageUserSuccess = errorResponse.success;
        this.addUserLessonMessageUser = errorResponse.message;
      } else {
        this.isAddUserLessonMessageUserSuccess = false;
        this.addUserLessonMessageUser = "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.";
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // UPDATE USER THEME
  // ----------------------

  updateUserThemeForm = new FormGroup({
    userThemeId: new FormControl(null, [Validators.required, Validators.min(1)]),
    updateUserThemeCertification: new FormControl(this.isUpdateUserThemeCertified),
  });

  onChangeUpdateFormUserThemeId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const userThemeId = Number(input.value);
    this.updateUserThemeForm.setErrors(null);
    this.updateUserThemeMessage = "";

    if (userThemeId > 0) {
      const userTheme = this.allUserThemes.find(userTheme => userTheme.id === userThemeId);
      
      if(!userTheme) {
        this.userNameOfUserThemeToUpdate = '';
        this.userEmailOfUserThemeToUpdate = '';
        this.themeNameOfUserThemeToUpdate = '';
        this.isUpdateUserThemeCertified = false;
        this.updateUserThemeForm.controls.updateUserThemeCertification.setValue(false);

        this.updateUserThemeMessage = "Cet identifiant ne correspond à aucune association utilisateur / thème";
        this.isUpdateUserThemeMessageSuccess = false;
        this.updateUserThemeForm.setErrors({forceError: true});
        return
      };

      const user = this.allUsers.find(user => user.id === userTheme.userId);
      this.userNameOfUserThemeToUpdate = user ? this.getUserName(user.id) : '';
      this.userEmailOfUserThemeToUpdate = user ? user.email : '';

      const theme = this.allThemes.find(theme => theme.id === userTheme.themeId);
      this.themeNameOfUserThemeToUpdate = theme ? this.getThemeName(theme.id) : '';

      this.isUpdateUserThemeCertified = userTheme.isCertified;
      this.updateUserThemeForm.controls.updateUserThemeCertification.setValue(userTheme.isCertified);
    } else {
      this.userNameOfUserThemeToUpdate = '';
      this.userEmailOfUserThemeToUpdate = '';
      this.themeNameOfUserThemeToUpdate = '';
      this.isUpdateUserThemeCertified = false;
      this.updateUserThemeForm.controls.updateUserThemeCertification.setValue(false);
    }
  }

  onChangeUpdateFormUserCertification(event: Event) {
    const checkbox = event.currentTarget as HTMLInputElement;
    this.updateUserThemeForm.controls.updateUserThemeCertification.setValue(checkbox.checked);
  }

  async onSubmitUserThemeUpdateForm() {
    this.updateUserThemeForm.markAllAsDirty();
    if(this.updateUserThemeForm.invalid) {
      this.isUpdateUserThemeMessageSuccess = false;
      this.updateUserThemeMessage = "Le formulaire n'est pas valide.";
      return;
    }

    try {
      const userThemeId = this.updateUserThemeForm.value.userThemeId;
      const updateUserThemeResponse = await firstValueFrom(this.http.patch<ApiResponse>(environment.backUrl + `/api/user-theme/${userThemeId}`, this.updateUserThemeForm.value, {withCredentials: true}));
      this.isUpdateUserThemeMessageSuccess = updateUserThemeResponse.success;
      this.updateUserThemeMessage = updateUserThemeResponse.message;
      if (updateUserThemeResponse.success) {
        this.updateUserThemeForm.reset();
        this.userNameOfUserThemeToUpdate = '';
        this.userEmailOfUserThemeToUpdate = '';
        this.themeNameOfUserThemeToUpdate = '';
        this.isUpdateUserThemeCertified = false;
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.isUpdateUserThemeMessageSuccess = errorResponse.success;
        this.updateUserThemeMessage = errorResponse.message;
      } else {
        this.isUpdateUserThemeMessageSuccess = false;
        this.updateUserThemeMessage = "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.";
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // UPDATE USER CURSUS
  // ----------------------

   updateUserCursusForm = new FormGroup({
    userCursusId: new FormControl(null, [Validators.required, Validators.min(1)]),
    updateUserCursusValidation: new FormControl(this.isUpdateUserCursusValidated),
  });

  onChangeUpdateFormUserCursusId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const userCursusId = Number(input.value);
    this.updateUserCursusForm.setErrors(null);
    this.updateUserCursusMessage = "";

    if (userCursusId > 0) {
      const userCursus = this.allUserCursus.find(userCursus => userCursus.id === userCursusId);
      
      if(!userCursus) {
        this.userNameOfUserCursusToUpdate = '';
        this.userEmailOfUserCursusToUpdate = '';
        this.cursusNameOfUserCursusToUpdate = '';
        this.isUpdateUserCursusValidated = false;
        this.updateUserCursusForm.controls.updateUserCursusValidation.setValue(false);

        this.updateUserCursusMessage = "Cet identifiant ne correspond à aucune association utilisateur / cursus";
        this.isUpdateUserCursusMessageSuccess = false;
        this.updateUserCursusForm.setErrors({forceError: true});
        return
      };

      const user = this.allUsers.find(user => user.id === userCursus.userId);
      this.userNameOfUserCursusToUpdate = user ? this.getUserName(user.id) : '';
      this.userEmailOfUserCursusToUpdate = user ? user.email : '';

      const cursus = this.allCursus.find(cursus => cursus.id === userCursus.cursusId);
      this.cursusNameOfUserCursusToUpdate = cursus ? this.getCursusName(cursus.id) : '';

      this.isUpdateUserCursusValidated = userCursus.isValidated;
      this.updateUserCursusForm.controls.updateUserCursusValidation.setValue(userCursus.isValidated);
    } else {
      this.userNameOfUserCursusToUpdate = '';
      this.userEmailOfUserCursusToUpdate = '';
      this.cursusNameOfUserCursusToUpdate = '';
      this.isUpdateUserCursusValidated = false;
      this.updateUserCursusForm.controls.updateUserCursusValidation.setValue(false);
    }
  }

  onChangeUpdateFormUserCursusValidation(event: Event) {
    const checkbox = event.currentTarget as HTMLInputElement;
    this.updateUserCursusForm.controls.updateUserCursusValidation.setValue(checkbox.checked);
  }

  async onSubmitUserCursusUpdateForm() {
    this.updateUserCursusForm.markAllAsDirty();
    if(this.updateUserCursusForm.invalid) {
      this.isUpdateUserCursusMessageSuccess = false;
      this.updateUserCursusMessage = "Le formulaire n'est pas valide.";
      return;
    }

    try {
      const userCursusId = this.updateUserCursusForm.value.userCursusId;
      const updateUserCursusResponse = await firstValueFrom(this.http.patch<ApiResponse>(environment.backUrl + `/api/user-cursus/${userCursusId}`, this.updateUserCursusForm.value, {withCredentials: true}));
      this.isUpdateUserCursusMessageSuccess = updateUserCursusResponse.success;
      this.updateUserCursusMessage = updateUserCursusResponse.message;
      if (updateUserCursusResponse.success) {
        this.updateUserCursusForm.reset();
        this.userNameOfUserCursusToUpdate = '';
        this.userEmailOfUserCursusToUpdate = '';
        this.cursusNameOfUserCursusToUpdate = '';
        this.isUpdateUserCursusValidated = false;
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.isUpdateUserCursusMessageSuccess = errorResponse.success;
        this.updateUserCursusMessage = errorResponse.message;
      } else {
        this.isUpdateUserCursusMessageSuccess = false;
        this.updateUserCursusMessage = "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.";
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // UPDATE USER LESSON
  // ----------------------

  updateUserLessonForm = new FormGroup({
    userLessonId: new FormControl(null, [Validators.required, Validators.min(1)]),
    updateUserLessonValidation: new FormControl(this.isUpdateUserLessonValidated),
  });

  onChangeUpdateFormUserLessonId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const userLessonId = Number(input.value);
    this.updateUserLessonForm.setErrors(null);
    this.updateUserLessonMessage = "";

    if (userLessonId > 0) {
      const userLesson = this.allUserLessons.find(userLesson => userLesson.id === userLessonId);
      
      if(!userLesson) {
        this.userNameOfUserLessonToUpdate = '';
        this.userEmailOfUserLessonToUpdate = '';
        this.lessonNameOfUserLessonToUpdate = '';
        this.isUpdateUserLessonValidated = false;
        this.updateUserLessonForm.controls.updateUserLessonValidation.setValue(false);

        this.updateUserLessonMessage = "Cet identifiant ne correspond à aucune association utilisateur / leçon";
        this.isUpdateUserLessonMessageSuccess = false;
        this.updateUserLessonForm.setErrors({forceError: true});
        return
      };

      const user = this.allUsers.find(user => user.id === userLesson.userId);
      this.userNameOfUserLessonToUpdate = user ? this.getUserName(user.id) : '';
      this.userEmailOfUserLessonToUpdate = user ? user.email : '';

      const lesson = this.allLessons.find(lesson => lesson.id === userLesson.lessonId);
      this.lessonNameOfUserLessonToUpdate = lesson ? this.getLessonName(lesson.id) : '';

      this.isUpdateUserLessonValidated = userLesson.isValidated;
      this.updateUserLessonForm.controls.updateUserLessonValidation.setValue(userLesson.isValidated);
    } else {
      this.userNameOfUserLessonToUpdate = '';
      this.userEmailOfUserLessonToUpdate = '';
      this.lessonNameOfUserLessonToUpdate = '';
      this.isUpdateUserLessonValidated = false;
      this.updateUserLessonForm.controls.updateUserLessonValidation.setValue(false);
    }
  }

  onChangeUpdateFormUserLessonValidation(event: Event) {
    const checkbox = event.currentTarget as HTMLInputElement;
    this.updateUserLessonForm.controls.updateUserLessonValidation.setValue(checkbox.checked);
  }

  async onSubmitUserLessonUpdateForm() {
    this.updateUserLessonForm.markAllAsDirty();
    if(this.updateUserLessonForm.invalid) {
      this.isUpdateUserLessonMessageSuccess = false;
      this.updateUserLessonMessage = "Le formulaire n'est pas valide.";
      return;
    }

    try {
      const userLessonId = this.updateUserLessonForm.value.userLessonId;
      const updateUserLessonResponse = await firstValueFrom(this.http.patch<ApiResponse>(environment.backUrl + `/api/user-lesson/${userLessonId}`, this.updateUserLessonForm.value, {withCredentials: true}));
      this.isUpdateUserLessonMessageSuccess = updateUserLessonResponse.success;
      this.updateUserLessonMessage = updateUserLessonResponse.message;
      if(updateUserLessonResponse.success) {
        this.updateUserLessonForm.reset();
        this.userNameOfUserLessonToUpdate = '';
        this.userEmailOfUserLessonToUpdate = '';
        this.lessonNameOfUserLessonToUpdate = '';
        this.isUpdateUserLessonValidated = false;
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.isUpdateUserLessonMessageSuccess = errorResponse.success;
        this.updateUserLessonMessage = errorResponse.message;
      } else {
        this.isUpdateUserLessonMessageSuccess = false;
        this.updateUserLessonMessage = "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.";
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // DELETE USER THEME
  // ----------------------

  deleteUserThemeForm = new FormGroup({
    userThemeId: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  onChangeDeleteFormUserThemeId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const userThemeId = Number(input.value);
    this.deleteUserThemeForm.setErrors(null);
    this.deleteUserThemeMessage = "";

    if (userThemeId > 0) {
      const userTheme = this.allUserThemes.find(userTheme => userTheme.id === userThemeId);
      
      if(!userTheme) {
        this.userNameOfUserThemeToDelete = '';
        this.userEmailOfUserThemeToDelete = '';
        this.themeNameOfUserThemeToDelete = '';

        this.deleteUserThemeMessage = "Cet identifiant ne correspond à aucune association utilisateur / thème";
        this.isDeleteUserThemeMessageSuccess = false;
        this.deleteUserThemeForm.setErrors({forceError: true});
        return
      };

      const user = this.allUsers.find(user => user.id === userTheme.userId);
      this.userNameOfUserThemeToDelete = user ? this.getUserName(user.id) : '';
      this.userEmailOfUserThemeToDelete = user ? user.email : '';

      const theme = this.allThemes.find(theme => theme.id === userTheme.themeId);
      this.themeNameOfUserThemeToDelete = theme ? this.getThemeName(theme.id) : '';
    } else {
      this.userNameOfUserThemeToDelete = '';
      this.userEmailOfUserThemeToDelete = '';
      this.themeNameOfUserThemeToDelete = '';
    }
  }

  async onSubmitUserThemeDeleteForm() {
    this.deleteUserThemeForm.markAllAsDirty();
    if(this.deleteUserThemeForm.invalid) {
      this.isDeleteUserThemeMessageSuccess = false;
      this.deleteUserThemeMessage = "Le formulaire n'est pas valide.";
      return;
    }

    try {
      const userThemeId = this.deleteUserThemeForm.controls.userThemeId.value;
      const deleteUserThemeResponse = await firstValueFrom(this.http.delete<ApiResponse>(environment.backUrl + `/api/user-theme/${userThemeId}`, {withCredentials: true}));
      this.isDeleteUserThemeMessageSuccess = deleteUserThemeResponse.success;
      this.deleteUserThemeMessage = deleteUserThemeResponse.message;
      if (deleteUserThemeResponse.success) {
        this.deleteUserThemeForm.reset();
        this.userNameOfUserThemeToDelete = '';
        this.userEmailOfUserThemeToDelete = '';
        this.themeNameOfUserThemeToDelete = '';
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.isDeleteUserThemeMessageSuccess = errorResponse.success;
        this.deleteUserThemeMessage = errorResponse.message;
      } else {
        this.isDeleteUserThemeMessageSuccess = false;
        this.deleteUserThemeMessage = "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.";
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // DELETE USER CURSUS
  // ----------------------

  deleteUserCursusForm = new FormGroup({
    userCursusId: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  onChangeDeleteFormUserCursusId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const userCursusId = Number(input.value);
    this.deleteUserCursusForm.setErrors(null);
    this.deleteUserCursusMessage = "";

    if (userCursusId > 0) {
      const userCursus = this.allUserCursus.find(userCursus => userCursus.id === userCursusId);
      
      if(!userCursus) {
        this.userNameOfUserCursusToDelete = '';
        this.userEmailOfUserCursusToDelete = '';
        this.cursusNameOfUserCursusToDelete = '';

        this.deleteUserCursusMessage = "Cet identifiant ne correspond à aucune association utilisateur / cursus";
        this.isDeleteUserCursusMessageSuccess = false;
        this.deleteUserCursusForm.setErrors({forceError: true});
        return
      };

      const user = this.allUsers.find(user => user.id === userCursus.userId);
      this.userNameOfUserCursusToDelete = user ? this.getUserName(user.id) : '';
      this.userEmailOfUserCursusToDelete = user ? user.email : '';

      const cursus = this.allCursus.find(cursus => cursus.id === userCursus.cursusId);
      this.cursusNameOfUserCursusToDelete = cursus ? this.getCursusName(cursus.id) : '';
    } else {
      this.userNameOfUserCursusToDelete = '';
      this.userEmailOfUserCursusToDelete = '';
      this.cursusNameOfUserCursusToDelete = '';
    }
  }

  async onSubmitUserCursusDeleteForm() {
    this.deleteUserCursusForm.markAllAsDirty();
    if(this.deleteUserCursusForm.invalid) {
      this.isDeleteUserCursusMessageSuccess = false;
      this.deleteUserCursusMessage = "Le formulaire n'est pas valide.";
      return;
    }

    try {
      const userCursusId = this.deleteUserCursusForm.controls.userCursusId.value;
      const deleteUserCursusResponse = await firstValueFrom(this.http.delete<ApiResponse>(environment.backUrl + `/api/user-cursus/${userCursusId}`, {withCredentials: true}));
      this.isDeleteUserCursusMessageSuccess = deleteUserCursusResponse.success;
      this.deleteUserCursusMessage = deleteUserCursusResponse.message;
      if (deleteUserCursusResponse.success) {
        this.deleteUserCursusForm.reset();
        this.userNameOfUserCursusToDelete = '';
        this.userEmailOfUserCursusToDelete = '';
        this.cursusNameOfUserCursusToDelete = '';
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.isDeleteUserCursusMessageSuccess = errorResponse.success;
        this.deleteUserCursusMessage = errorResponse.message;
      } else {
        this.isDeleteUserCursusMessageSuccess = false;
        this.deleteUserCursusMessage = "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.";
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // DELETE USER LESSON
  // ----------------------

  deleteUserLessonForm = new FormGroup({
    userLessonId: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  onChangeDeleteFormUserLessonId(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const userLessonId = Number(input.value);
    this.deleteUserLessonForm.setErrors(null);
    this.deleteUserLessonMessage = "";

    if (userLessonId > 0) {
      const userLesson = this.allUserLessons.find(userLesson => userLesson.id === userLessonId);
      
      if(!userLesson) {
        this.userNameOfUserLessonToDelete = '';
        this.userEmailOfUserLessonToDelete = '';
        this.lessonNameOfUserLessonToDelete = '';

        this.deleteUserLessonMessage = "Cet identifiant ne correspond à aucune association utilisateur / leçon";
        this.isDeleteUserLessonMessageSuccess = false;
        this.deleteUserLessonForm.setErrors({forceError: true});
        return
      };

      const user = this.allUsers.find(user => user.id === userLesson.userId);
      this.userNameOfUserLessonToDelete = user ? this.getUserName(user.id) : '';
      this.userEmailOfUserLessonToDelete = user ? user.email : '';

      const lesson = this.allLessons.find(lesson => lesson.id === userLesson.lessonId);
      this.lessonNameOfUserLessonToDelete = lesson ? this.getLessonName(lesson.id) : '';
    } else {
      this.userNameOfUserLessonToDelete = '';
      this.userEmailOfUserLessonToDelete = '';
      this.lessonNameOfUserLessonToDelete = '';
    }
  }

  async onSubmitUserLessonDeleteForm() {
    this.deleteUserLessonForm.markAllAsDirty();
    if(this.deleteUserLessonForm.invalid) {
      this.isDeleteUserLessonMessageSuccess = false;
      this.deleteUserLessonMessage = "Le formulaire n'est pas valide.";
      return;
    }

    try {
      const userLessonId = this.deleteUserLessonForm.controls.userLessonId.value;
      const deleteUserLessonResponse = await firstValueFrom(this.http.delete<ApiResponse>(environment.backUrl + `/api/user-lesson/${userLessonId}`, {withCredentials: true}));
      this.isDeleteUserLessonMessageSuccess = deleteUserLessonResponse.success;
      this.deleteUserLessonMessage = deleteUserLessonResponse.message;
      if (deleteUserLessonResponse.success) {
        this.deleteUserLessonForm.reset();
        this.userNameOfUserLessonToDelete = '';
        this.userEmailOfUserLessonToDelete = '';
        this.lessonNameOfUserLessonToDelete = '';
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.isDeleteUserLessonMessageSuccess = errorResponse.success;
        this.deleteUserLessonMessage = errorResponse.message;
      } else {
        this.isDeleteUserLessonMessageSuccess = false;
        this.deleteUserLessonMessage = "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.";
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // READ USER THEMES
  // ----------------------

  getThemeName(themeId: number): string {
    const theme = this.allThemes.find(theme => theme.id === themeId);
    if (theme) {
      return `${theme.name} (${theme.id})`;
    } else {
      return 'Thème introuvable';
    }
  }

  onSearchThemeInputChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const inputValue = input.value;
    
    if (!inputValue) {
      this.filteredUserThemes = this.allUserThemes;
      return;
    }

    const wordsInputValue = inputValue.toLowerCase().split(' ');

    this.filteredUserThemes = this.allUserThemes.filter(userTheme => {
      const user = this.allUsers.find(user => user.id === userTheme.userId);
      const theme = this.allThemes.find(theme => theme.id === userTheme.themeId);

      const userThemeId = userTheme.id.toString();
      const userFullName = this.getUserName(userTheme.userId);
      const themeName = this.getThemeName(userTheme.themeId);
      const isCertified = userTheme.isCertified ? 'Oui' : 'Non';
      const certifiedDate = userTheme.isCertified ? this.getFormatedDate(userTheme.updatedAt) : 'Non concerné';
      const creationDate = this.getFormatedDate(userTheme.createdAt);

      const userThemeData = `${userThemeId} ${userFullName.toLowerCase()} ${themeName.toLowerCase()} ${isCertified.toLowerCase()} ${certifiedDate.toLowerCase()} ${creationDate.toLowerCase()}`;
      
      let isConcerned = true;
      wordsInputValue.forEach((word) => {
        if (!userThemeData.includes(word)) isConcerned = false;
      });
      return isConcerned;
    });
  }

  // ----------------------
  // READ USER CURSUS
  // ----------------------

  getCursusName(cursusId: number): string {
    const cursus = this.allCursus.find(cursus => cursus.id === cursusId);
    if (cursus) {
      return `${cursus.name} (${cursus.id})`;
    } else {
      return 'Cursus introuvable';
    }
  }

  onSearchCursusInputChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const inputValue = input.value;
    
    if (!inputValue) {
      this.filteredUserCursus = this.allUserCursus;
      return;
    }

    const wordsInputValue = inputValue.toLowerCase().split(' ');

    this.filteredUserCursus = this.allUserCursus.filter(userCursus => {
      const user = this.allUsers.find(user => user.id === userCursus.userId);
      const cursus = this.allCursus.find(cursus => cursus.id === userCursus.cursusId);

      const userCursusId = userCursus.id.toLocaleString();
      const userFullName = this.getUserName(userCursus.userId);
      const cursusName = this.getCursusName(userCursus.cursusId);
      const isValidated = userCursus.isValidated ? 'Oui' : 'Non';
      const validationDate = userCursus.isValidated ? this.getFormatedDate(userCursus.updatedAt) : 'Non concerné';
      const creationDate = this.getFormatedDate(userCursus.createdAt);

      const userCursusData = `${userCursusId} ${userFullName.toLowerCase()} ${cursusName.toLowerCase()} ${isValidated.toLowerCase()} ${validationDate.toLowerCase()} ${creationDate.toLowerCase()}`;
      
      let isConcerned = true;
      wordsInputValue.forEach((word) => {
        if (!userCursusData.includes(word)) isConcerned = false;
      });
      return isConcerned;
    });
  }

  // ----------------------
  // READ USER LESSONS
  // ----------------------

  getLessonName(lessonId: number): string {
    const lesson = this.allLessons.find(lesson => lesson.id === lessonId);
    if (lesson) {
      return `${lesson.name} (${lesson.id})`;
    } else {
      return 'Leçon introuvable';
    }
  }

  onSearchLessonInputChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const inputValue = input.value;
    
    if (!inputValue) {
      this.filteredUserLessons = this.allUserLessons;
      return;
    }

    const wordsInputValue = inputValue.toLowerCase().split(' ');

    this.filteredUserLessons = this.allUserLessons.filter(userLesson => {
      const user = this.allUsers.find(user => user.id === userLesson.userId);
      const lesson = this.allLessons.find(lesson => lesson.id === userLesson.lessonId);

      const userLessonId = userLesson.id.toString();
      const userFullName = this.getUserName(userLesson.userId);
      const lessonName = this.getLessonName(userLesson.lessonId);
      const isValidated = userLesson.isValidated ? 'Oui' : 'Non';
      const validationDate = userLesson.isValidated ? this.getFormatedDate(userLesson.updatedAt) : 'Non concernée';
      const creationDate = this.getFormatedDate(userLesson.createdAt);

      const userLessonData = `${userLessonId} ${userFullName.toLowerCase()} ${lessonName.toLowerCase()} ${isValidated.toLowerCase()} ${validationDate.toLowerCase()} ${creationDate.toLowerCase()}`;
      
      let isConcerned = true;
      wordsInputValue.forEach((word) => {
        if (!userLessonData.includes(word)) isConcerned = false;
      });
      return isConcerned;
    });
  }
}
