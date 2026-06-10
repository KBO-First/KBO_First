const cards = document.querySelectorAll('.flip-card');

cards.forEach(card => {
  card.addEventListener('click', function () {
    this.classList.toggle('flipped');
  });
});

const flipAllBtn = document.getElementById('flipAllBtn');
let allFlipped = false;

flipAllBtn.addEventListener('click', function () {
  allFlipped = !allFlipped;
  cards.forEach(card => {
    card.classList.toggle('flipped', allFlipped);
  });
  flipAllBtn.textContent = allFlipped ? '↩ BACK — 앞면' : '↻ FLIPPED — 뒷면';
});
