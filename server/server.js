// require('dotenv').config({ path: './.env' })
const express = require('express')
const app = express()
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
// const { resolve } = require('path')
// const bodyParser = require('body-parser')

// app.use(express.static('../public'))
// app.use(bodyParser.json())

// const express = require("express");
// const app = express();
// This is a public sample test API key.
// To avoid exposing it, don't submit any personally identifiable information through requests with this API key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.use(express.static("../public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
   // Replace this constant with a calculation of the order's amount
   // Calculate the order total on the server to prevent
   // people from directly manipulating the amount on the client
   return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
   const { items } = req.body;

   // Create a PaymentIntent with the order amount and currency
   const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
         enabled: true,
      },
   });

   res.send({
      clientSecret: paymentIntent.client_secret,
   });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));

// app.get('/', (req, res) => {
//    const path = resolve('../public' + '/index.html')
//    res.sendFile('path')
// })

// app.get('/public-keys', (req, res) => {
//    res.send({ key: process.env.STRIPE_PUBLIC_KEY })
// })

// app.post('/my-route', (req, res) => {
//    console.log('body', req.body)
//    res.send(req.body)
// })

// app.post('/create-checkout-session', async (req, res) => {
//    const session = await stripe.checkout.sessions.create({
//       line_items: [
//          {
//             price_data: {
//                currency: 'usd',
//                product_data: {
//                   name: 'Book',
//                },
//                unit_amount: 2000,
//             },
//             quantity: 1,
//          },
//       ],
//       mode: 'payment',
//       success_url: 'https://example.com/success',
//       cancel_url: 'https://example.com/cancel',
//    });

//    res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on http://localhost:4242'))
