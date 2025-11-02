import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../core/models/api-response.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-stripe-payment',
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './stripe-payment.html',
  styleUrl: './stripe-payment.scss'
})
export class StripePayment {
  @ViewChild('cardElementContainer') cardElementContainer!: ElementRef;

  @Input() courseType!: 'cursus' | 'lesson';
  @Input() courseId!: number;
  @Output() paymentSucceeded = new EventEmitter<void>();
  @Output() noPayment = new EventEmitter<void>();

  stripe: Stripe | null = null;
  elements!: StripeElements;
  card!: StripeCardElement;

  isProcessing = false;
  isPayed = false
  message: string | null = null;
  isMessageSuccess = false;

  faSquareXMark: IconDefinition = faSquareXmark;

  constructor(private http: HttpClient) {};

  async ngAfterViewInit() {
    //this.stripe = await this.paymentService.loadStripe();
    this.stripe = await loadStripe(environment.stripePublicKey);
    this.elements = this.stripe!.elements();
    this.card = this.elements.create('card');
    this.card.mount(this.cardElementContainer.nativeElement);
  }

  async pay() {
    this.isProcessing = true;
    this.message = null;

    try {
      // Payment Intent generation in back-end
      const response = await firstValueFrom(this.http.post<ApiResponse>(environment.backUrl + '/api/stripe/create-payment-intent', { 
        type: this.courseType,
        courseId: this.courseId,
      }, { withCredentials: true }));

      if (!response.data) throw new Error('No data property in response in pay function in stripe-payment.ts');
      const clientSecret: string = response.data;

      const { error, paymentIntent } = await this.stripe!.confirmCardPayment(clientSecret, {
        payment_method: { card: this.card },
      });

      if (error || !paymentIntent || paymentIntent.status !== 'succeeded') {
        this.isMessageSuccess = false;
        error && error.message ? this.message = error.message : this.message = "Une erreur s'est produite lors du paiement.";
        return;
      }
      this.isMessageSuccess = true;
      this.message = 'Merci pour votre achat, vous pouvez maintenant accéder à ce cours.\nNous vous souhaitons un bon apprentissage.';

      if (this.courseType === 'cursus') await firstValueFrom(this.http.post(environment.backUrl + '/api/user-cursus/add', { courseId: this.courseId }, { withCredentials: true }));
      if (this.courseType === 'lesson') await firstValueFrom(this.http.post(environment.backUrl + '/api/user-lesson/add', { courseId: this.courseId }, { withCredentials: true }));

      this.isPayed = true;
      this.paymentSucceeded.emit();
    } catch (error) {
      this.isMessageSuccess = false;
      this.message = "Une erreur s'est produite lors du paiement. Nous mettons tout en oeuvre pour solutionner le problème au plus vite, veuillez nous excuser.";
      console.error(error);
      // add external service like Sentry to save the error
    } finally {
      this.isProcessing = false;
    }
  }

  closeModal() {
    this.noPayment.emit();
  }
}
