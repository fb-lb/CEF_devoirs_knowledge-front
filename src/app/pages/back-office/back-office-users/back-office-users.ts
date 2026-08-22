import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiResponse, UserData } from '../../../core/models/api-response.model';
import { UserService } from '../../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UpdateUserForm } from '../../../components/update-forms/update-user-form/update-user-form';
import { WarningModal } from '../../../components/warning-modal/warning-modal';

@Component({
  selector: 'app-back-office-users',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, UpdateUserForm, WarningModal],
  templateUrl: './back-office-users.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './back-office-users.scss',
})
export class BackOfficeUsers {
  faPen: IconDefinition = faPen;
  faTrash: IconDefinition = faTrash;

  allUsers: UserData[] = [];
  filteredUsers: UserData[] = [];
  allUsersSubscription!: Subscription;

  userIdToUpdate: number = 0;
  firstNameToUpdate: string = "";
  lastNameToUpdate: string = "";
  emailToUpdate: string = "";
  rolesToUpdate: ("user" | "admin")[] = [];
  isVerifiedToUpdate: boolean = false;

  userIdToDelete: number = 0;
  userFirstNameToDelete: string = "";
  userLastNameToDelete: string = "";
  cautionUserDeletionText: string = "";

  isUpdateUserFormModalOpen: boolean = false;
  isDeleteUserWarningModalOpen: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.userService.init();
    this.allUsersSubscription = this.userService.allUsers$.subscribe(newAllUsers => {
      this.allUsers = this.formatAllUsers(newAllUsers);
    });
    this.filteredUsers = this.allUsers;
  }

  ngOnDestroy(){
    this.allUsersSubscription?.unsubscribe();
  }

  // Get all users from database and store it in allUsers
  formatAllUsers(allUsers: UserData[]): UserData[] {
    if (allUsers.length === 0) return [];
    
    allUsers.forEach((user) => {
        user.rolesText = '';
        user.roles.forEach((role) => {
          role === 'user'
            ? (user.rolesText = user.rolesText + 'utilisateur' + ', ')
            : (user.rolesText = user.rolesText + role + ', ');
        });
        user.rolesText = user.rolesText.slice(0, user.rolesText.length - 2);
        if (user.updatedBy) {
          const userWhoUpdated = allUsers.find((u) => u.id === user.updatedBy);
          user.updatedByName = userWhoUpdated?.firstName + ' ' + userWhoUpdated?.lastName;
        } else if (!user.updatedBy && user.updatedAt) {
          user.updatedByName = 'Admin supprimé';
        } else {
          user.updatedByName = 'Non modifié';
        }
        if (!user.updatedAt) user.updatedAt = 'Non modifié';
      });
      return allUsers;
  }


  // ----------------
  //  PART OF MODAL FOR UPDATE FORM
  // ----------------

  displayUpdateUserForm(user: UserData) {
    this.userIdToUpdate = user.id;
    this.firstNameToUpdate = user.firstName;
    this.lastNameToUpdate = user.lastName;
    this.emailToUpdate = user.email;
    this.rolesToUpdate = user.roles;
    this.isVerifiedToUpdate = user.isVerified;
    this.isUpdateUserFormModalOpen = true;
  }

  closeUpdateUserFormModal() {
    this.isUpdateUserFormModalOpen = false;
  }

  // ----------------
  //  USER DELETION PART
  // ----------------

  confirmUserDeletion(user: UserData) {
    this.userIdToDelete = user.id;
    this.userFirstNameToDelete = user.firstName;
    this.userLastNameToDelete = user.lastName;
    this.cautionUserDeletionText = `Etes-vous sûr de vouloir supprimer l'utilisateur ${this.userLastNameToDelete} ${this.userFirstNameToDelete} ? Cette action sera irréversible et entraînera la suppression de l'utilisateur ainsi que tous ses accès aux cours qu'il a acheté et sa progression dans ces derniers.`
    this.isDeleteUserWarningModalOpen = true;
  }

  async deleteUser() {
    try {
        const response = await firstValueFrom(
        this.http.delete<ApiResponse>(environment.backUrl + `/api/utilisateurs/${this.userIdToDelete}`));
        await this.userService.retrieveAllUsers();
        this.onSearchReadFormChange();
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

  // ----------------
  //  READ FORM PART
  // ----------------

  readForm = new FormGroup({
    search: new FormControl(''),
  });

  onSearchReadFormChange(): void {
    const inputValue = this.readForm.get('search')?.value?.trim().toLowerCase();
    if (!inputValue) {
      this.filteredUsers = this.allUsers;
      return;
    }

    const wordsInputValue = inputValue.split(' ');

    this.filteredUsers = this.allUsers.filter((user) => {
      const idString = user.id.toString();
      const updateByString = user.updatedBy?.toString();
      const userDataString =
        idString.toLowerCase() +
        ' ' +
        user.firstName.toLowerCase() +
        ' ' +
        user.lastName.toLowerCase() +
        ' ' +
        user.email.toLowerCase() +
        ' ' +
        user.rolesText.toLowerCase() +
        ' ' +
        (user.isVerified ? 'oui' : 'non') +
        ' ' +
        user.createdAt.toLowerCase() +
        ' ' +
        user.updatedAt.toLowerCase() +
        ' ' +
        (updateByString ? updateByString?.toLowerCase() : '') +
        ' ' +
        user.updatedByName?.toLowerCase();
      let isConcerned = true;
      wordsInputValue.forEach((word) => {
        if (!userDataString.includes(word)) isConcerned = false;
      });
      return isConcerned;
    });
  }
}