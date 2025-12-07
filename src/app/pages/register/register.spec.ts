import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Register } from './register';
import { FormService } from '../../services/form.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let formService: FormService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        FormService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    
    formService = TestBed.inject(FormService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(formService).toBeTruthy();
  });

  it('should submit a valid form and display a success message', async () => {
    component.form.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password: 'fake-Password-1345-*ù$!',
      confirmPassword: 'fake-Password-1345-*ù$!',
    });

    const firstName = component.form.value.firstName;
    const lastName = component.form.value.lastName;

    const submitPromise = component.onSubmit();

    const req = httpMock.expectOne(environment.backUrl + '/api/inscription');
    expect(req.request.method).toBe('POST');

    // Fake response from back end
    req.flush({
      success: true,
      message: `Merci ${component.form.value.firstName} ${component.form.value.lastName}.\nVous êtes bien inscrit, un mail vous a été envoyé pour activer votre compte.\nVeuillez activer votre compte pour pouvoir vous connecter.`,
      data: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        roles: ['user'],
        isVerified: false,
        createdAt: '2025-01-01 10:00:00',
        updatedAt: '2025-01-01 10:00:00',
        updatedBy: null,
      },
    });
    
    await submitPromise;

    // Assertions
    expect(component.formError).toBe('');
    expect(component.formSuccess).toBe(`Merci ${firstName} ${lastName}.\nVous êtes bien inscrit, un mail vous a été envoyé pour activer votre compte.\nVeuillez activer votre compte pour pouvoir vous connecter.`);
    expect(component.form.valid).toBe(false); // because of form.reset()
  
    const values = component.form.getRawValue();
    expect(values.firstName).toBeNull();
    expect(values.email).toBeNull();
  });

  it('should not submit when form is invalid', async () => {
    component.form.setValue({
      firstName: '', // make the form invalid
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password: 'fake-Password-1345-*ù$!',
      confirmPassword: 'fake-Password-1345-*ù$!',
    });

    expect(component.form.invalid).toBe(true);

    await component.onSubmit();

    httpMock.expectNone(environment.backUrl + '/api/inscription');
    expect(component.formSuccess).toBe('');
    expect(component.formError).toBe('');
    expect(component.form.touched).toBe(true);
  });

  it("should display an error message and not submit when passwords don't match", async () => {
    component.form.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'fake-Password-1345-*ù$!',
      confirmPassword: 'super-fake-Password-1345-*ù$!', // different from password
    });

    expect(component.form.valid).toBe(true);

    await component.onSubmit();

    httpMock.expectNone(environment.backUrl + '/api/inscription');
    expect(component.formError).toBe('Les deux mots de passe doivent être identiques.');
    expect(component.formSuccess).toBe('');
    expect(component.form.touched).toBe(true);
  });

  it('should display a back-end error message when registration fails', fakeAsync(() => {
    component.form.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'fake-Password-1345-*ù$!',
      confirmPassword: 'fake-Password-1345-*ù$!',
    });

    component.onSubmit();

    const req = httpMock.expectOne(environment.backUrl + '/api/inscription');
    expect(req.request.method).toBe('POST');

    req.flush(
      {
        success: false,
        message: "Ce mail est déjà utilisé par un compte enregistré, veuillez utiliser un autre mail.",
      },
      {
        status: 409,
        statusText: 'Conflict',
      }
    );

    tick();
    fixture.detectChanges();

    expect(component.formError).toBe("Ce mail est déjà utilisé par un compte enregistré, veuillez utiliser un autre mail.");
    expect(component.formSuccess).toBe('');    
  }));

  it('should display an error message because back-end is unreachable', fakeAsync(() => {
    component.form.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'fake-Password-1345-*ù$!',
      confirmPassword: 'fake-Password-1345-*ù$!',
    });

    component.onSubmit();

    const req = httpMock.expectOne(environment.backUrl + '/api/inscription');
    expect(req.request.method).toBe('POST');

    req.error(new ProgressEvent('error'), {
      status: 0,
      statusText: 'Unknown error',
    });

    tick();
    fixture.detectChanges();

    expect(component.formError).toBe("Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.");
    expect(component.formSuccess).toBe('');
  }));

  it('should display an error message because an unexpectable error occurs', fakeAsync(() => {
    spyOn(component['http'], 'post').and.returnValue(
      throwError(() => new Error("An unexpected error occurs"))
    );

    component.form.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'fake-Password-1345-*ù$!',
      confirmPassword: 'fake-Password-1345-*ù$!',
    });

    const consoleSpy = spyOn(console, 'error');

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.formError).toBe("Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.");
    expect(component.formSuccess).toBe('');
    expect(consoleSpy).toHaveBeenCalled();
  }));
});