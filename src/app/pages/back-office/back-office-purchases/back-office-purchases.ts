import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ApiResponse, CursusData, LessonData, ThemeData, UserCursusData, UserData, UserLessonData, UserThemeData } from '../../../core/models/api-response.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { NgClass } from '@angular/common';
import { UserCourses } from '../../../services/user-courses';
import { UserService } from '../../../services/user.service';
import { CoursesService } from '../../../services/courses.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { WarningModal } from '../../../components/warning-modal/warning-modal';

@Component({
  selector: 'app-back-office-purchases',
  imports: [ɵInternalFormsSharedModule, FontAwesomeModule, ReactiveFormsModule, NgClass, WarningModal],
  templateUrl: './back-office-purchases.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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

  faTrash: IconDefinition = faTrash;
  faCircleXmark: IconDefinition = faCircleXmark;

  isWarningModalOpen : boolean = false;
  warningMessage: string = "";
  warningModalConfirmation: () => void = () => {};

  isUserThemesMessageDisplayed: boolean = false;
  isUserCursusMessageDisplayed: boolean = false;
  isUserLessonsMessageDisplayed: boolean = false;

  isModalMessageDisplayed: boolean = false;
  isModalMessageSuccess: boolean = false;
  modalMessageText: string = "";
  modalMessageInterval?: ReturnType<typeof setInterval>;
  modalMessageTimer: number = 0;

  userThemesMessage: string = "";
  userCursusMessage: string = "";
  userLessonsMessage: string = "";

  isUserThemesMessageSuccess: boolean = false;
  isUserCursusMessageSuccess: boolean = false;
  isUserLessonsMessageSuccess: boolean = false;

  userThemeIdToDelete: number = 0;
  userCursusIdToDelete: number = 0;
  userLessonIdToDelete: number = 0;

  userThemeIdToUpdate: number = 0;
  userCursusIdToUpdate: number = 0;

  loadingUserThemeIds: Set<number> = new Set<number>();
  loadingUserCursusIds: Set<number> = new Set<number>();
  loadingUserLessonIds: Set<number> = new Set<number>();

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

  constructor(private http: HttpClient, public formService: FormService, private userCoursesService: UserCourses, private userService: UserService, private coursesService: CoursesService) {}

  async ngOnInit() {
    try {
      // Retrieve all users data
      await this.userService.init();
      this.allUsers = this.userService.getAllUsers;

      // Retrieve all courses data
      await this.coursesService.init();
      this.allThemes = this.coursesService.getAllThemes.map(theme => ({...theme}));
      this.allCursus = this.coursesService.getAllCursus.map(cursus => ({...cursus}));
      this.allLessons = this.coursesService.getAllLessons.map(lesson => ({...lesson}));

      // Retrieve all user-courses data
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

  ngOnDestroy() {
    if (this.modalMessageInterval)  clearInterval(this.modalMessageInterval);
  }

  async syncAllUserCoursesData() {
    const getAllUserThemeResponse = await firstValueFrom(this.http.get<ApiResponse<UserThemeData[]>>(environment.backUrl + '/api/user-theme/all'));
    if (getAllUserThemeResponse.data) {
      this.allUserThemes = getAllUserThemeResponse.data;
      this.filteredUserThemes = getAllUserThemeResponse.data;
    }

    const getAllUserCursusResponse = await firstValueFrom(this.http.get<ApiResponse<UserCursusData[]>>(environment.backUrl + '/api/user-cursus/all'));
    if (getAllUserCursusResponse.data) {
      this.allUserCursus = getAllUserCursusResponse.data;
      this.filteredUserCursus = getAllUserCursusResponse.data;
    }

    const getAllUserLessonResponse = await firstValueFrom(this.http.get<ApiResponse<UserLessonData[]>>(environment.backUrl + '/api/user-lesson/all'));
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

  // ------------------------
  // DISPLAY MESSAGE METHODS
  // ------------------------

  hideModalMessage() {
    this.isModalMessageDisplayed = false;
    this.modalMessageText = '';
    if (this.modalMessageInterval) {
      clearInterval(this.modalMessageInterval);
      this.modalMessageInterval = undefined;
    }
  }

  async displayModalMessage(success: boolean, message: string): Promise<void> {
    this.hideModalMessage();
    this.isModalMessageSuccess = success;
    this.modalMessageText = message;
    this.isModalMessageDisplayed = true;

    this.modalMessageTimer = success ? 5 : 10;

    this.modalMessageInterval = setInterval(() => {
      this.modalMessageTimer--;
      if (this.modalMessageTimer <= 0) this.hideModalMessage();
    }, 1000);
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
      const addUserCursusResponse = await firstValueFrom(this.http.post<ApiResponse>(environment.backUrl + '/api/user-cursus/add', body));
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
      const addUserLessonResponse = await firstValueFrom(this.http.post<ApiResponse>(environment.backUrl + '/api/user-lesson/add', body));
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

  confirmUserThemeUpdate(event:Event, userThemeId:number){
    event?.preventDefault();
    this.userThemeIdToUpdate = userThemeId;
    this.warningModalConfirmation = this.updateUserTheme;
    this.warningMessage = "Valider/invalider la certification d'un thème pour un utilisateur validera/invalidera tous les cursus et toutes les leçons dépendants de ce thème, pour cet utilisateur. Veuillez confirmer votre choix :";
    this.isWarningModalOpen = true;
  }

  async updateUserTheme() {
    this.loadingUserThemeIds.add(this.userThemeIdToUpdate);
    try {
      const userThemeToUpdate = this.filteredUserThemes.find(userTheme => userTheme.id === this.userThemeIdToUpdate);
      if (!userThemeToUpdate) throw new AppError(404, 'USER_THEME_NOT_FOUND', 'userTheme not found in filteredUserThemes', 'Une erreur est survenue sur la page, veuillez recharger la page.');
      const body = {
        userThemeId: userThemeToUpdate.id,
        updateUserThemeCertification: userThemeToUpdate.isCertified ? false : true,
      };
      const updateUserThemeResponse = await firstValueFrom(this.http.patch<ApiResponse>(environment.backUrl + `/api/user-theme/${userThemeToUpdate.id}`, body));
      this.displayModalMessage(updateUserThemeResponse.success, updateUserThemeResponse.message);
      if (updateUserThemeResponse.success) {
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.displayModalMessage(errorResponse.success, errorResponse.message);
      } else if (error instanceof AppError && error.code === 'USER_THEME_NOT_FOUND') {
        this.displayModalMessage(false, error.userMessage);
      } else {
        this.displayModalMessage(false, "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.");
      }
      console.error(error);
      // add external service like Sentry to save the error
    } finally {
      this.loadingUserThemeIds.delete(this.userThemeIdToUpdate);
    }
  }

  // ----------------------
  // UPDATE USER CURSUS
  // ----------------------

  confirmUserCursusUpdate(event:Event, userCursusId:number){
    event?.preventDefault();
    this.userCursusIdToUpdate = userCursusId;
    this.warningModalConfirmation = this.updateUserCursus;
    this.warningMessage = "Valider/invalider un cursus pour un utilisateur validera/invalidera toutes les leçons dépendantes de ce cursus, pour cet utilisateur. Veuillez confirmer votre choix :";
    this.isWarningModalOpen = true;
  }

  async updateUserCursus() {
    this.loadingUserCursusIds.add(this.userCursusIdToUpdate);
    try {
      const userCursusToUpdate = this.filteredUserCursus.find(userCursus => userCursus.id === this.userCursusIdToUpdate);
      if (!userCursusToUpdate) throw new AppError(404, 'USER_CURSUS_NOT_FOUND', 'userCursus not found in filteredUserCursus', 'Une erreur est survenue sur la page, veuillez recharger la page.');
      const body = {
        userCursusId: userCursusToUpdate.id,
        updateUserCursusValidation: userCursusToUpdate.isValidated ? false : true,
      };
      const updateUserCursusResponse = await firstValueFrom(this.http.patch<ApiResponse>(environment.backUrl + `/api/user-cursus/${userCursusToUpdate.id}`, body));
      this.displayModalMessage(updateUserCursusResponse.success, updateUserCursusResponse.message);
      if (updateUserCursusResponse.success) {
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.displayModalMessage(errorResponse.success, errorResponse.message);
      } else if (error instanceof AppError) {
        this.displayModalMessage(false, error.userMessage);
      } else {
        this.displayModalMessage(false, "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.");
      } 
      console.error(error);
      // add external service like Sentry to save the error
    } finally {
        this.loadingUserCursusIds.delete(this.userCursusIdToUpdate);
    }
  }

  // ----------------------
  // UPDATE USER LESSON
  // ----------------------

  async updateUserLesson(event: Event, userLessonId: number) {
    event.preventDefault();
    this.loadingUserLessonIds.add(userLessonId);
    try {
      const userLessonToUpdate = this.filteredUserLessons.find(userLesson => userLesson.id === userLessonId);
      if (!userLessonToUpdate) throw new AppError(404, 'USER_LESSON_NOT_FOUND', 'userLesson not found in filteredUserLessons', 'Une erreur est survenue sur la page, veuillez recharger la page.')
      const body = {
        userLessonId: userLessonToUpdate.id,
        updateUserLessonValidation: userLessonToUpdate.isValidated ? false : true,
      };
      const updateUserLessonResponse = await firstValueFrom(this.http.patch<ApiResponse>(environment.backUrl + `/api/user-lesson/${userLessonToUpdate.id}`, body));
      this.displayModalMessage(updateUserLessonResponse.success, updateUserLessonResponse.message);
      if(updateUserLessonResponse.success) {
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.displayModalMessage(errorResponse.success, errorResponse.message);
      } else if (error instanceof AppError) {
        this.displayModalMessage(false, error.userMessage);
      } else {
        this.displayModalMessage(false, "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.")
      }
      console.error(error);
      // add external service like Sentry to save the error
    } finally {
      this.loadingUserLessonIds.delete(userLessonId);
    }
  }

  // ----------------------
  // DELETE USER THEME
  // ----------------------

  closingOfDeletionWarningModal() {
    this.isWarningModalOpen = false;
  }

  confirmUserThemeDeletion(userThemeId: number) {
    this.userThemeIdToDelete = userThemeId;
    this.warningModalConfirmation = this.deleteUserTheme;
    this.warningMessage = "Supprimer l'accès à un thème pour un utilisateur supprimera l'accès à tous les cursus et toutes les leçons dépendants de ce thème, pour cet utilisateur. Veuillez confirmer votre choix :"
    this.isWarningModalOpen = true;
  }

  async deleteUserTheme() {
    try {
      const deleteUserThemeResponse = await firstValueFrom(this.http.delete<ApiResponse>(environment.backUrl + `/api/user-theme/${this.userThemeIdToDelete}`));
      this.displayModalMessage(deleteUserThemeResponse.success, deleteUserThemeResponse.message);
      if (deleteUserThemeResponse.success) {
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.displayModalMessage(errorResponse.success, errorResponse.message);
      } else {
        this.displayModalMessage(false, "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.")
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // DELETE USER CURSUS
  // ----------------------

  confirmUserCursusDeletion(userCursusId: number) {
    this.userCursusIdToDelete = userCursusId;
    this.warningModalConfirmation = this.deleteUserCursus;
    this.warningMessage = "Supprimer l'accès à un cursus pour un utilisateur supprimera l'accès à toutes les leçons dépendantes de ce cursus, pour cet utilisateur. Veuillez confirmer votre choix :"
    this.isWarningModalOpen = true;
  }

  async deleteUserCursus() {
    try {
      const deleteUserCursusResponse = await firstValueFrom(this.http.delete<ApiResponse>(environment.backUrl + `/api/user-cursus/${this.userCursusIdToDelete}`));
      this.displayModalMessage(deleteUserCursusResponse.success, deleteUserCursusResponse.message);
      if (deleteUserCursusResponse.success) {
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.displayModalMessage(errorResponse.success, errorResponse.message);
      } else {
        this.displayModalMessage(false, "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.");
      }
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  // ----------------------
  // DELETE USER LESSON
  // ----------------------

  confirmUserLessonDeletion(userLessonId: number) {
    this.userLessonIdToDelete = userLessonId
    this.warningModalConfirmation = this.deleteUserLesson;
    this.warningMessage = "Cette suppression supprimera définitivement l'accès de cette leçon à cet utilisateur. Veuillez confirmer votre choix :"
    this.isWarningModalOpen = true;
  }

  async deleteUserLesson() {
    try {
      const deleteUserLessonResponse = await firstValueFrom(this.http.delete<ApiResponse>(environment.backUrl + `/api/user-lesson/${this.userLessonIdToDelete}`));
      this.displayModalMessage(deleteUserLessonResponse.success, deleteUserLessonResponse.message);
      if (deleteUserLessonResponse.success) {
        await this.syncAllUserCoursesData();
        await this.userCoursesService.syncUserThemesForThisUser();
        await this.userCoursesService.syncUserCursusForThisUser();
        await this.userCoursesService.syncUserLessonsForThisUser();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        this.displayModalMessage(errorResponse.success, errorResponse.message);
      } else {
        this.displayModalMessage(false, "Nous ne parvenons pas à nous connecter aux serveurs. Veuillez nous excuser pour la gêne occasionnée.");
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
