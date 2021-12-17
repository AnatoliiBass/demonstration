
// let stripe
// fetch('/public-keys', {
//    mode: 'no-cors'
// }).then((response) => response.json()).then((data) => {
//    console.log('Success:', data)
//    stripe = Stripe(data.key)
// }).catch((error) => {
//    console.error('Error:', error)
// })

// const btn = document.getElementById('btn')
// btn.addEventListener('click', e => {
//    e.preventDefault()
//    fetch('http://localhost:4242/my-route', {
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {
//          'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//          test: 123,
//          payment_method: 'pm_card_visa',
//          address: {
//             line1: '123 main street'
//          }
//       }),
//    }).then((response) => response.json()).then((data) => {
//       console.log('Success:', data)
//    }).catch((error) => {
//       console.error('Error:', error);
//    })
// })

const stripe = Stripe('pk_test_51Jw1NSCCeUycvZLCAtXl93HKaxrrvFLbKFp3wT8GWxf7xCIqMYc8n2SEUU5Tpk3beIirwM9KaKvPsAMEg57I6Y4E00xYCu9hyT');



// Create an instance of Elements.
const elements = stripe.elements();



// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
   base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
         color: '#aab7c4'
      }
   },
   invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
   }
};

// Create an instance of the card Element.
var card = elements.create('card', { style: style });
console.log(card);
// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');
// Handle real-time validation errors from the card Element.
card.on('change', function (event) {
   var displayError = document.getElementById('card-errors');
   if (event.error) {
      displayError.textContent = event.error.message;
   } else {
      displayError.textContent = '';
   }
});

// Handle form submission.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function (event) {
   event.preventDefault();

   stripe.createToken(card).then(function (result) {
      if (result.error) {
         // Inform the user if there was an error.
         var errorElement = document.getElementById('card-errors');
         errorElement.textContent = result.error.message;
      } else {
         // Send the token to your server.
         stripeTokenHandler(result.token);
      }
   });
});

// Submit the form with the token ID.
function stripeTokenHandler(token) {
   console.log(token);
   // Insert the token ID into the form so it gets submitted to the server
   var form = document.getElementById('payment-form');
   var hiddenInput = document.createElement('input');
   hiddenInput.setAttribute('type', 'hidden');
   hiddenInput.setAttribute('name', 'stripeToken');
   hiddenInput.setAttribute('value', token.id);
   form.appendChild(hiddenInput);

   // Submit the form
   form.submit();
}