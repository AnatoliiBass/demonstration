require('dotenv').config({ path: './.env' })
const express = require('express')
const app = express()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { resolve } = require('path')
const bodyParser = require('body-parser')

app.use(express.static('../public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
   const path = resolve('../public' + '/index.html')
   res.sendFile('path')
})

app.get('/public-keys', (req, res) => {
   res.send({ key: 'pk_test_51Jw1NSCCeUycvZLCAtXl93HKaxrrvFLbKFp3wT8GWxf7xCIqMYc8n2SEUU5Tpk3beIirwM9KaKvPsAMEg57I6Y4E00xYCu9hyT' })
})

app.post('/my-route', (req, res) => {
   console.log('body', req.body)
   res.send(req.body)
})

app.listen(4242, () => console.log('Running on http://localhost:4242'))
