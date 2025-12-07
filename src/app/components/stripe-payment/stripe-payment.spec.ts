import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StripePayment } from './stripe-payment';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { StripeLoaderService } from '../../services/stripe-loader.service';
import { throwError } from 'rxjs';

describe('StripePayment', () => {
  let component: StripePayment;
  let fixture: ComponentFixture<StripePayment>;
  let httpMock: HttpTestingController;
  let cardElementMock: { mount: jasmine.Spy<jasmine.Func>; };
  let elementsMock: { create: jasmine.Spy<jasmine.Func>; };
  let stripeLoaderSpy: jasmine.SpyObj<StripeLoaderService>;
  let stripeMock: {
    elements: jasmine.Spy<jasmine.Func>;
    confirmCardPayment: jasmine.Spy<jasmine.Func>;
  };
  let emitSpy: jasmine.Spy<(value?: void | undefined) => void>;
  let consoleSpy: jasmine.Spy;

  beforeEach(async () => {
    cardElementMock = { mount: jasmine.createSpy() };
    elementsMock = { create: jasmine.createSpy().and.returnValue(cardElementMock) };
    stripeMock = {
      elements: jasmine.createSpy().and.returnValue(elementsMock),
      confirmCardPayment: jasmine.createSpy().and.resolveTo({
        error: null,
        paymentIntent: { status: 'succeeded' },
      }),
    };
    
    stripeLoaderSpy = jasmine.createSpyObj('StripeLoaderService', ['loadStripe']);
    stripeLoaderSpy.loadStripe.and.resolveTo(stripeMock as any);

    await TestBed.configureTestingModule({
      imports: [StripePayment],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: StripeLoaderService, useValue: stripeLoaderSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripePayment);
    component = fixture.componentInstance;

    httpMock = TestBed.inject(HttpTestingController);
    component.courseType = 'cursus';
    component.courseId = 1;
    component.cardElementContainer = {
      nativeElement: {},
    };
    
    emitSpy = spyOn(component.paymentSucceeded, 'emit');
    consoleSpy = spyOn(console, 'error');

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit paymentSucceeded because payment is successfull', fakeAsync(() => {
    tick();

    component.pay();

    const reqIntent = httpMock.expectOne(environment.backUrl + '/api/stripe/create-payment-intent');
    reqIntent.flush({
      success: true,
      message: '',
      data: 'fake-client-secret',
    });

    tick();
    fixture.detectChanges();

    const reqAdd = httpMock.expectOne(environment.backUrl + '/api/user-cursus/add');
    reqAdd.flush({
      success: true,
      message: '',
    });

    tick();
    fixture.detectChanges();

    expect(stripeMock.confirmCardPayment).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
    expect(component.isPayed).toBe(true);
    expect(component.isMessageSuccess).toBeTrue();
    expect(component.message).toBe('Merci pour votre achat, vous pouvez maintenant accéder à ce cours.\nNous vous souhaitons un bon apprentissage.');
  }));

  it('should throw an error because response for payment intent request does not have data property', fakeAsync(() => {
    tick();

    component.pay();

    const reqIntent = httpMock.expectOne(environment.backUrl + '/api/stripe/create-payment-intent');
    expect(reqIntent.request.method).toBe('POST');
    
    reqIntent.flush({
      success: false,
      message: "L'achat n'est pas possible pour le moment, veuillez contacter le support pour solutionner le problème au plus vite.",
    });

    tick();
    fixture.detectChanges();

    expect(stripeMock.confirmCardPayment).toHaveBeenCalledTimes(0);
    expect(component.isMessageSuccess).toBeFalse();
    expect(component.message).toBe("Une erreur s'est produite lors du paiement. Nous mettons tout en oeuvre pour solutionner le problème au plus vite, veuillez nous excuser.");
    httpMock.expectNone(environment.backUrl + '/api/user-cursus/add');
    expect(component.isPayed).toBeFalse();
    expect(emitSpy).toHaveBeenCalledTimes(0);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  }));

  it('should display an error message because card payment confirmation failed on stripe', fakeAsync(() => {
    stripeMock.confirmCardPayment.and.resolveTo({
      error: { message: "La carte a expirée" },
      paymentIntent: { status: 'failed' },
    });
    tick();

    component.pay();

    const reqIntent = httpMock.expectOne(environment.backUrl + '/api/stripe/create-payment-intent');
    expect(reqIntent.request.method).toBe('POST');
    
    reqIntent.flush({
      success: true,
      message: "",
      data: 'fake-client-secret',
    });

    tick();
    fixture.detectChanges();

    expect(stripeMock.confirmCardPayment).toHaveBeenCalledTimes(1);
    expect(component.isMessageSuccess).toBeFalse();
    expect(component.message).toBe('La carte a expirée');
    httpMock.expectNone(environment.backUrl + '/api/user-cursus/add');
    expect(component.isPayed).toBeFalse();
    expect(emitSpy).toHaveBeenCalledTimes(0);
    expect(consoleSpy).toHaveBeenCalledTimes(0);
  }));

  it('should display an error message because back-end send an error', fakeAsync(() => {
    tick();

    component.pay();

    const reqIntent = httpMock.expectOne(environment.backUrl + '/api/stripe/create-payment-intent');
    expect(reqIntent.request.method).toBe('POST');
    
    reqIntent.flush(
      {
        success: false,
        message: "L'achat n'est pas possible pour le moment, veuillez contacter le support pour solutionner le problème au plus vite.",
      }, 
      {
        status: 404,
        statusText: 'element to purchase not found',
      }
    );

    tick();
    fixture.detectChanges();

    expect(stripeMock.confirmCardPayment).toHaveBeenCalledTimes(0);
    expect(component.isMessageSuccess).toBeFalse();
    expect(component.message).toBe("Une erreur s'est produite lors du paiement. Nous mettons tout en oeuvre pour solutionner le problème au plus vite, veuillez nous excuser.");
    httpMock.expectNone(environment.backUrl + '/api/user-cursus/add');
    expect(component.isPayed).toBeFalse();
    expect(emitSpy).toHaveBeenCalledTimes(0);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  }));

  it('should display an error message because back-end is unreachable', fakeAsync(() => {
    tick();

    component.pay();

    const reqIntent = httpMock.expectOne(environment.backUrl + '/api/stripe/create-payment-intent');
    expect(reqIntent.request.method).toBe('POST');
    
    reqIntent.error(new ProgressEvent('error'), {
      status: 0,
      statusText: 'back-end is unreachable',
    }); 
    tick();
    fixture.detectChanges();

    expect(stripeMock.confirmCardPayment).toHaveBeenCalledTimes(0);
    expect(component.isMessageSuccess).toBeFalse();
    expect(component.message).toBe("Une erreur s'est produite lors du paiement. Nous mettons tout en oeuvre pour solutionner le problème au plus vite, veuillez nous excuser.");
    httpMock.expectNone(environment.backUrl + '/api/user-cursus/add');
    expect(component.isPayed).toBeFalse();
    expect(emitSpy).toHaveBeenCalledTimes(0);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  }));

  it('should display an error message because an unexpected error occurs', fakeAsync(() => {
    spyOn(component['http'], 'post').and.returnValue(
      throwError(() => new Error("An unexpected error occurs"))
    );
    tick();

    component.pay();

    tick();
    fixture.detectChanges();

    httpMock.expectNone(environment.backUrl + '/api/stripe/create-payment-intent');
    expect(stripeMock.confirmCardPayment).toHaveBeenCalledTimes(0);
    expect(component.isMessageSuccess).toBeFalse();
    expect(component.message).toBe("Une erreur s'est produite lors du paiement. Nous mettons tout en oeuvre pour solutionner le problème au plus vite, veuillez nous excuser.");
    httpMock.expectNone(environment.backUrl + '/api/user-cursus/add');
    expect(component.isPayed).toBeFalse();
    expect(emitSpy).toHaveBeenCalledTimes(0);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  }));
});