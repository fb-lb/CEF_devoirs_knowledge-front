import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiResponse, UserData } from '../../../core/models/api-response.model';
import { UserService } from '../../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UpdateUserForm } from '../../../components/update-forms/update-user-form/update-user-form';

@Component({
  selector: 'app-back-office-users',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, UpdateUserForm],
  templateUrl: './back-office-users.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './back-office-users.scss',
})
export class BackOfficeUsers {
  faPen: IconDefinition = faPen;
  faTrash: IconDefinition = faTrash;

  deleteGlobalMessage: string = '';
  isDeleteGlobalMessageSuccess: boolean = true;
  allUsers: UserData[] = [];
  filteredUsers: UserData[] = [];
  allUsersSubscription!: Subscription;

  userIdToUpdate: number = 0;
  firstNameToUpdate: string = "";
  lastNameToUpdate: string = "";
  emailToUpdate: string = "";
  rolesToUpdate: ("user" | "admin")[] = [];
  isVerifiedToUpdate: boolean = false;

  deleteId: number | null = null;
  deleteFirstName: string = '';
  deleteLastName: string = '';
  deleteEmail: string = '';
  deleteRolesText: string = '';
  deleteIsVerified: string = '';
  deleteCreatedAt: string = '';
  deleteUpdatedAt: string = '';
  deleteUpdatedBy: string = '';

  isUpdateUserFormModalOpen: boolean = false;

  constructor(public formService: FormService, private http: HttpClient, private userService: UserService) {}

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
  //  DELETE FORM PART
  // ----------------

  deleteForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.min(1), Validators.maxLength(20)]),
  });

  getIdValue(form: FormGroup): number | null {
    const id = form.get('id')?.value;
    return id !== null && id !== undefined ? parseInt(id, 10) : null;
  }

  onIdDeleteFormChange(id: number | null): void {
    if (id) {
      const userToDelete = this.allUsers.find((user) => user.id === id);
      if (userToDelete) {
        this.deleteId = id;
        this.deleteFirstName = userToDelete.firstName;
        this.deleteLastName = userToDelete.lastName;
        this.deleteEmail = userToDelete.email;
        userToDelete.roles.forEach((role) => {
          this.deleteRolesText = this.deleteRolesText + role + ', ';
        });
        this.deleteRolesText = this.deleteRolesText.slice(0, this.deleteRolesText.length - 2);
        this.deleteIsVerified = userToDelete.isVerified ? 'Oui' : 'Non';
        this.deleteCreatedAt = userToDelete.createdAt;
        this.deleteUpdatedAt = userToDelete.updatedAt ?? '';
        this.deleteUpdatedBy = userToDelete.updatedBy?.toString()
          ? userToDelete.updatedByName + ` (${userToDelete.updatedBy})`
          : userToDelete.updatedByName;
      } else {
        this.deleteId = null;
        this.deleteFirstName = '';
        this.deleteLastName = '';
        this.deleteEmail = '';
        this.deleteRolesText = '';
        this.deleteIsVerified = '';
        this.deleteCreatedAt = '';
        this.deleteUpdatedAt = '';
        this.deleteUpdatedBy = '';
      }
    } else {
      this.deleteId = null;
      this.deleteFirstName = '';
      this.deleteLastName = '';
      this.deleteEmail = '';
      this.deleteRolesText = '';
      this.deleteIsVerified = '';
      this.deleteCreatedAt = '';
      this.deleteUpdatedAt = '';
      this.deleteUpdatedBy = '';
    }
  }

  async onSubmitDeleteForm() {
    this.deleteForm.markAllAsTouched();
    this.deleteGlobalMessage = '';
    if (this.deleteForm.valid) {
      try {
        const response = await firstValueFrom(
          this.http.delete<ApiResponse>(environment.backUrl + `/api/utilisateurs/${this.deleteForm.get('id')?.value}`));
        this.isDeleteGlobalMessageSuccess = response.success;
        this.deleteGlobalMessage = response.message;
        this.deleteForm.reset();
        this.deleteId = null;
        this.deleteFirstName = '';
        this.deleteLastName = '';
        this.deleteEmail = '';
        this.deleteRolesText = '';
        this.deleteIsVerified = '';
        this.deleteCreatedAt = '';
        this.deleteUpdatedAt = '';
        this.deleteUpdatedBy = '';
        await this.userService.retrieveAllUsers();
        this.onSearchReadFormChange();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const response = error.error as ApiResponse;
          this.isDeleteGlobalMessageSuccess = response.success;
          this.deleteGlobalMessage = response.message;
        } else {
          this.isDeleteGlobalMessageSuccess = false;
          this.deleteGlobalMessage =
            "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.";
          console.error(error);
          // add external service like Sentry to save the error
        }
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
