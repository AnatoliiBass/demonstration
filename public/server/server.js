const express = require('express')
const app = express()
// This is a public sample test API key.
// To avoid exposing it, don't submit any personally identifiable information through requests with this API key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.use(express.static("../"));
app.use(express.json());

const calculateOrderAmount = (items) => {
   // Replace this constant with a calculation of the order's amount
   // Calculate the order total on the server to prevent
   // people from directly manipulating the amount on the client
   return 1400;
};

app.post("/create-checkout-session", async (req, res) => {
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
