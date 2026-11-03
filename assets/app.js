/* Table13 — site interactivity (vanilla JS, no build step) */
(function () {
  'use strict';

  /* Newsletter capture (index.html) */
  var joinForm = document.getElementById('joinForm');
  if (joinForm) {
    joinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      joinForm.style.display = 'none';
      var thanks = document.getElementById('joinThanks');
      if (thanks) thanks.style.display = 'flex';
    });
  }

  /* Booking (booking.html) */
  var order = document.querySelector('.order');
  if (!order) return;

  var PRICES = { seat: 4500, pairing: 6200 };
  var LABELS = { seat: 'A seat', pairing: 'Seat + pairing' };
  var state = { tier: 'seat', qty: 2, method: 'upi' };

  var fmt = function (n) { return '₹' + n.toLocaleString('en-IN'); };

  var tierBtns = order.querySelectorAll('.tier');
  var methodBtns = order.querySelectorAll('.methods button');
  var qtyEl = document.getElementById('qty');
  var sumLine = document.getElementById('sumLine');
  var subEl = document.getElementById('sub');
  var totalEl = document.getElementById('total');
  var payBtn = document.getElementById('payBtn');
  var seatsLeft = document.getElementById('seatsLeft');

  function render() {
    var subtotal = PRICES[state.tier] * state.qty;
    tierBtns.forEach(function (b) { b.classList.toggle('sel', b.dataset.tier === state.tier); });
    methodBtns.forEach(function (b) { b.classList.toggle('sel', b.dataset.method === state.method); });
    qtyEl.textContent = state.qty;
    sumLine.textContent = LABELS[state.tier] + ' × ' + state.qty;
    subEl.textContent = fmt(subtotal);
    totalEl.textContent = fmt(subtotal);
    seatsLeft.textContent = Math.max(0, 6 - (state.qty - 1)) + ' of 14 left';
    var verb = state.method === 'wa' ? 'Send me a WhatsApp pay link for ' + fmt(subtotal)
      : 'Pay ' + fmt(subtotal) + (state.method === 'card' ? ' by card' : ' by UPI');
    payBtn.textContent = verb;
  }

  tierBtns.forEach(function (b) {
    b.addEventListener('click', function () { state.tier = b.dataset.tier; render(); });
  });
  methodBtns.forEach(function (b) {
    b.addEventListener('click', function () { state.method = b.dataset.method; render(); });
  });
  document.getElementById('inc').addEventListener('click', function () { state.qty = Math.min(6, state.qty + 1); render(); });
  document.getElementById('dec').addEventListener('click', function () { state.qty = Math.max(1, state.qty - 1); render(); });

  payBtn.addEventListener('click', function () {
    /* Hook your Razorpay order creation here, then open Checkout.
       Demo: show the confirmed state. */
    document.getElementById('payBlock').style.display = 'none';
    document.getElementById('confirmed').style.display = 'block';
  });

  render();
})();
