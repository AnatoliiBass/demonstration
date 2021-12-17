
let stripe
fetch('http://localhost:4242/public-keys', {
   mode: 'no-cors'
}).then((response) => response.json()).then((data) => {
   console.log('Success:', data)
   stripe = Stripe(data.key)
}).catch((error) => {
   console.error('Error:', error)
})

const btn = document.getElementById('btn')
btn.addEventListener('click', e => {
   e.preventDefault()
   fetch('http://localhost:4242/my-route', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         test: 123,
         payment_method: 'pm_card_visa',
         address: {
            line1: '123 main street'
         }
      }),
   }).then((response) => response.json()).then((data) => {
      console.log('Success:', data)
   }).catch((error) => {
      console.error('Error:', error);
   })
})