import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.STRIPE_KEY)

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
});

export default stripe;