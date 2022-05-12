import axios from 'axios';
import { showAlert } from './alerts';

/* eslint-disable */
const stripe = Stripe(
  'pk_test_51KyH6GEohU1NOUJSssJMZD8gPxI8x1k893JqSI8xwynXY8LGIabH7yGJWAtfF8O5jX8EgiQAHhAokNoJe0eHXbXC00YzY91jiU'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form & charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
