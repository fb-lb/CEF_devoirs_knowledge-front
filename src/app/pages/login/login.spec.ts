import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Login } from './login';
import { FormService } from '../../services/form.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { of, throwError } from 'rxjs';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let formService: FormService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;
  let consoleSpy: jasmine.Spy;

  beforeEach(async () => {
    //const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl']);
    const routerSpy = {
      navigate: jasmine.createSpy('navigate'),
      createUrlTree: jasmine.createSpy('createUrlTree'),
      serializeUrl: jasmine.createSpy('serializeUrl'),
      events: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        FormService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerSpy},
        { 
          provide: ActivatedRoute, 
          useValue: {
            snapshot: {},
            params: of({}),
            queryParams: of({}),
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    formService = TestBed.inject(FormService);
    httpMock = TestBed.inject(HttpTestingController);
    consoleSpy = spyOn(console, 'error');

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(formService).toBeTruthy();
  });

  it('should submit a valid form and redirect to home page', fakeAsync(() => {
    component.form.setValue({
      email: 'john.doe@test.com',
      password: 'fake-Password-12345-ù$*!',
    });

    component.onSubmit();

    const req = httpMock.expectOne(environment.backUrl + '/api/authentification/connexion');
    expect(req.request.method).toBe('POST');

    req.flush({
      success: true,
      message: "",
    });

    tick();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should not send back end request because form in invalid', async () => {
    component.form.setValue({
      email: '',
      password: 'fake-Password-12345-ù$*!',
    });

    await component.onSubmit();

    httpMock.expectNone(environment.backUrl + '/api/authentification/connexion');
    expect(component.form.touched).toBe(true);
    expect(component.formError).toBe('');
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });

  it('should display an error message because user is not found in back-end', fakeAsync(() => {
    component.form.setValue({
      email: 'john.doe@test.com',
      password: 'fake-Password-12345-ù$*!',
    });

    component.onSubmit();

    const req = httpMock.expectOne(environment.backUrl + '/api/authentification/connexion');
    req.flush(
      {
        success: false,
        message: "Cet email ne correspond à aucun compte enregistré.",
      },
      {
        status: 401,
        statusText: 'User not found with this email',
      }
    );

    tick();
    fixture.detectChanges();

    expect(component.formError).toBe("Cet email ne correspond à aucun compte enregistré.");
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(consoleSpy).toHaveBeenCalledTimes(0);
  }));

  it('should display an error message because back-end is unreachable', fakeAsync(() => {
    component.form.setValue({
      email: 'john.doe@test.com',
      password: 'fake-Password-12345-ù$*!',
    });

    component.onSubmit();

    const req = httpMock.expectOne(environment.backUrl + '/api/authentification/connexion');
    req.error(new ProgressEvent('error'), {
      status: 0,
      statusText: 'back-end is unreachable',
    });

    tick();
    fixture.detectChanges();

    expect(component.formError).toBe("Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.");
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(consoleSpy).toHaveBeenCalledTimes(0);
  }));

  it('should display an error message because an unexpectable error occurs', fakeAsync(() => {
    spyOn(component['http'], 'post').and.returnValue(
      throwError(() => new Error("An unexpected error occurs"))
    );

    component.form.setValue({
      email: 'john.doe@test.com',
      password: 'fake-Password-12345-ù$*!',
    });

    component.onSubmit();

    tick();
    fixture.detectChanges();

    expect(component.formError).toBe("Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.");
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  }));
});