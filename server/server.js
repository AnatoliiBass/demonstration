require('dotenv').config({ path: './.env' })
const express = require('express')
const app = express()
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
const { resolve } = require('path')
const bodyParser = require('body-parser')

app.use(express.static('../public'))
app.use(bodyParser.json())

console.log(stripe.checkout);

app.get('/', (req, res) => {
   const path = resolve('../public' + '/index.html')
   res.sendFile('path')
})

app.get('/public-keys', (req, res) => {
   res.send({ key: process.env.STRIPE_PUBLIC_KEY })
})

app.post('/my-route', (req, res) => {
   console.log('body', req.body)
   res.send(req.body)
})

app.post('/create-checkout-session', async (req, res) => {
   const session = await stripe.checkout.sessions.create({
      line_items: [
         {
            price_data: {
               currency: 'usd',
               product_data: {
                  name: 'T-shirt',
               },
               unit_amount: 2000,
            },
            quantity: 1,
         },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
   });

   res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on http://localhost:4242'))
