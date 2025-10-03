import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { FormService } from '../services/form.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiResponse, UserData } from '../core/models/api-response.model';

@Component({
  selector: 'app-back-office-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './back-office-users.html',
  styleUrl: './back-office-users.scss'
})
export class BackOfficeUsers {

  updateGlobalMessage: string = "";
  isUpdateGlobalMessageSuccess: boolean = true;
  deleteGlobalMessage: string = "";
  isDeleteGlobalMessageSuccess: boolean = true;
  allUsers: UserData[] = [];
  filteredUsers: UserData[] = [];

  deleteId: number|null = null;
  deleteFirstName: string = "";
  deleteLastName: string = "";
  deleteEmail: string = "";
  deleteRolesText: string = "";
  deleteIsVerified: string = "";
  deleteCreatedAt: string = "";
  deleteUpdatedAt: string = "";
  deleteUpdatedBy: string = "";

  constructor(public formService: FormService, private http: HttpClient){}

  async ngOnInit(): Promise<void> {
    this.allUsers = await this.syncAllUsers();
    this.filteredUsers = this.allUsers;
  }

  // Get all users from database and store it in allUsers
  async syncAllUsers(): Promise<UserData[]>  {
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<UserData[]>>(environment.backUrl + '/api/utilisateurs/tous', { withCredentials: true }));
      let allUsers: UserData[] = [];
      if (response.data) allUsers = response.data;
      allUsers.forEach(user => {
        user.rolesText = "";
        user.roles.forEach(role => {
          role === 'user' ? user.rolesText = user.rolesText + 'utilisateur' + ", " : user.rolesText = user.rolesText + role + ", "
        });
        user.rolesText = user.rolesText.slice(0, user.rolesText.length - 2);
        if(user.updatedBy) {
          const userWhoUpdated = allUsers.find(u => u.id === user.updatedBy);
          user.updatedByName = userWhoUpdated?.firstName + ' ' + userWhoUpdated?.lastName;
        } else {
          user.updatedByName = 'Personne';
        };
      });
      return allUsers;
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error
      return [];
    }
  }

  // ----------------
  //  UPDATE FORM PART
  // ----------------

  updateForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.maxLength(20),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
      Validators.pattern(/^[a-zA-Zéèêàîùôçïäâëüöœ '\-\.]*$/),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
      Validators.pattern(/^[a-zA-Zéèêàîùôçïäâëüöœ '\-\.]*$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(80),
    ]),
    roles: new FormArray<FormControl<"user" | "admin">>([]),
    isVerified: new FormControl(false),
  });

  // Modify roles FormArray content (FormControl) according to admin selection
  onRoleChange(event: Event, role: string): void {
    const checkbox = event.target as HTMLInputElement;
    const roles = this.updateForm.get('roles') as FormArray;

    if (checkbox.checked) {
      roles.push(new FormControl(role));
    } else {
      const index = roles.controls.findIndex(x => x.value === role);
      roles.removeAt(index);
    }
  }

  getIdValue(form: FormGroup): number |null {
    const id = form.get('id')?.value;
    return id !== null && id !== undefined ? parseInt(id, 10) : null;
  }

  onIdUpdateFormChange(id: number | null): void {
    const user = this.allUsers.find(user => user.id === id)
    const rolesFormArray = this.updateForm.get('roles') as FormArray<FormControl<"user" | "admin">>;;
    if(user && id) {
      this.updateForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
      });

      rolesFormArray.clear();
      user.roles.forEach((role) => {
        rolesFormArray.push(new FormControl<'user' | 'admin'>(role, { nonNullable: true }));
      });
    } else {
      this.updateForm.patchValue({
        firstName: '',
        lastName: '',
        email: '',
        isVerified: false,
      });
      rolesFormArray.clear();
    }
  }

  async onSubmitUpdateForm() {
    this.updateForm.markAllAsTouched();
    this.updateGlobalMessage = "";
    if (this.updateForm.valid){
      try {
        const response = await firstValueFrom(this.http.patch<ApiResponse>(environment.backUrl + `/api/utilisateurs/${this.updateForm.get('id')?.value}`, this.updateForm.value, { withCredentials: true }));
        this.isUpdateGlobalMessageSuccess = response.success;
        this.updateGlobalMessage = response.message;
        this.updateForm.reset();
        this.allUsers = await this.syncAllUsers();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const response = error.error as ApiResponse;
          this.isUpdateGlobalMessageSuccess = response.success;
          this.updateGlobalMessage = response.message;
        } else {
          this.isUpdateGlobalMessageSuccess = false;
          this.updateGlobalMessage = "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.";
          console.error(error);
          // add external service like Sentry to save the error
        }
      }
    }
  }

  // ----------------
  //  DELETE FORM PART
  // ----------------

  deleteForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.maxLength(20),
    ])
  });

  onIdDeleteFormChange(id: number | null): void {
    if (id) {
      const userToDelete = this.allUsers.find(user => user.id === id);
      if (userToDelete) {
        this.deleteId = id;
        this.deleteFirstName = userToDelete.firstName;
        this.deleteLastName = userToDelete.lastName;
        this.deleteEmail = userToDelete.email;
        userToDelete.roles.forEach(role => {
          this.deleteRolesText = this.deleteRolesText + role + ', ';
        });
        this.deleteRolesText = this.deleteRolesText.slice(0, this.deleteRolesText.length - 2);
        this.deleteIsVerified = userToDelete.isVerified ? 'Oui' : "Non";
        this.deleteCreatedAt = userToDelete.createdAt;
        this.deleteUpdatedAt = userToDelete.updatedAt ?? '';
        this.deleteUpdatedBy = userToDelete.updatedBy?.toString() ? userToDelete.updatedByName + ` (${userToDelete.updatedBy})` : userToDelete.updatedByName;
      } else {
        this.deleteId = null;
        this.deleteFirstName = "";
        this.deleteLastName = "";
        this.deleteEmail = "";
        this.deleteRolesText = "";
        this.deleteIsVerified = "";
        this.deleteCreatedAt = "";
        this.deleteUpdatedAt = "";
        this.deleteUpdatedBy = "";
      }
    } else {
        this.deleteId = null;
        this.deleteFirstName = "";
        this.deleteLastName = "";
        this.deleteEmail = "";
        this.deleteRolesText = "";
        this.deleteIsVerified = "";
        this.deleteCreatedAt = "";
        this.deleteUpdatedAt = "";
        this.deleteUpdatedBy = "";
    }
  }

  async onSubmitDeleteForm() {
    this.deleteForm.markAllAsTouched();
    this.deleteGlobalMessage = "";
    if (this.deleteForm.valid){
      try {
        const response = await firstValueFrom(this.http.delete<ApiResponse>(environment.backUrl + `/api/utilisateurs/${this.deleteForm.get('id')?.value}`, { withCredentials: true }));
        this.isDeleteGlobalMessageSuccess = response.success;
        this.deleteGlobalMessage = response.message;
        this.deleteForm.reset();
        this.deleteId = null;
        this.deleteFirstName = "";
        this.deleteLastName = "";
        this.deleteEmail = "";
        this.deleteRolesText = "";
        this.deleteIsVerified = "";
        this.deleteCreatedAt = "";
        this.deleteUpdatedAt = "";
        this.deleteUpdatedBy = "";
        this.allUsers = await this.syncAllUsers();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const response = error.error as ApiResponse;
          this.isDeleteGlobalMessageSuccess = response.success;
          this.deleteGlobalMessage = response.message;
        } else {
          this.isDeleteGlobalMessageSuccess = false;
          this.deleteGlobalMessage = "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.";
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
    if(!inputValue) {
      this.filteredUsers = this.allUsers;
      return
    }

    const wordsInputValue = inputValue.split(' ');
  
    this.filteredUsers = this.allUsers.filter(user => {
      const idString = user.id.toString();
      const updateByString = user.updatedBy?.toString();
      const userDataString = idString.toLowerCase() + ' ' +
                             user.firstName.toLowerCase() + ' ' +
                             user.lastName.toLowerCase() + ' ' + 
                             user.email.toLowerCase() + ' ' +  
                             user.rolesText.toLowerCase() + ' ' + 
                             (user.isVerified ? 'oui' : 'non') + ' ' +
                             user.createdAt.toLowerCase() + ' ' + 
                             user.updatedAt.toLowerCase() + ' ' + 
                             (updateByString ? updateByString?.toLowerCase() : '') + ' ' 
                             + user.updatedByName?.toLowerCase();
      let isConcerned = true;
      wordsInputValue.forEach(word => {
        if(!userDataString.includes(word)) isConcerned = false;
      });
      return isConcerned;
    });
  }
}
