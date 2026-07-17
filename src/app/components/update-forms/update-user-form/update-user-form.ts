import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user-form',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './update-user-form.html',
  styleUrl: './update-user-form.scss',
})
export class UpdateUserForm {
  @Input() userId!: number;
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() email!: string;
  @Input() roles!: ("user" | "admin")[];
  @Input() isVerified!: boolean;
  @Output() noUserUpdate = new EventEmitter<void>();
  @Output() refreshUserReadTable = new EventEmitter<void>();

  faSquareXmark: IconDefinition = faSquareXmark;

  isUpdateGlobalMessageSuccess: boolean = false;
  updateGlobalMessage: string = "";

  form = new FormGroup({
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
    roles: new FormArray<FormControl<'user' | 'admin'>>([]),
    isVerified: new FormControl(false),
  });

  constructor(public formService: FormService, private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    // Set form constrols' value
    this.form.controls.firstName.setValue(this.firstName);
    this.form.controls.lastName.setValue(this.lastName);
    this.form.controls.email.setValue(this.email);
    this.form.controls.isVerified.setValue(this.isVerified);
    const rolesFormArray = this.form.get('roles') as FormArray;
    for (const role of this.roles) {
      rolesFormArray.push(new FormControl(role));
    }
  }

  closeModal() {
    this.noUserUpdate.emit();
  }

  onRoleChange(event: Event, role: "user" | "admin"){
    const checkInput = event.target as HTMLInputElement;
    const rolesFormArray = this.form.controls.roles;

    if (checkInput.checked) {
      rolesFormArray.push(new FormControl(role, { nonNullable: true }));
    } else {
      const index = rolesFormArray.controls.findIndex(x => x.value === role);
      rolesFormArray.removeAt(index);
    }
  }

  async onSubmitForm() {
    this.form.markAllAsTouched();
    this.updateGlobalMessage = '';
    if (this.form.valid) {
      try {
        const response = await firstValueFrom(
          this.http.patch<ApiResponse>(
            environment.backUrl + `/api/utilisateurs/${this.userId}`, this.form.value));
        this.isUpdateGlobalMessageSuccess = response.success;
        this.updateGlobalMessage = response.message;
        this.form.reset();
        await this.userService.retrieveAllUsers();
        this.refreshUserReadTable.emit();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          const response = error.error as ApiResponse;
          this.isUpdateGlobalMessageSuccess = response.success;
          this.updateGlobalMessage = response.message;
        } else {
          this.isUpdateGlobalMessageSuccess = false;
          this.updateGlobalMessage =
            "Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.";
          console.error(error);
          // add external service like Sentry to save the error
        }
      }
    }
  }
}
