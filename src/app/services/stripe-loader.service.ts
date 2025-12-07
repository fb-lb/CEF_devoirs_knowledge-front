import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeLoaderService {
  loadStripe() {
    return loadStripe(environment.stripePublicKey);
  }
}
