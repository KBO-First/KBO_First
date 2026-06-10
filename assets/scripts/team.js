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

document.querySelectorAll('.back-icons .back-icon:nth-child(2)').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    const audio = this.closest('.flip-card-back').querySelector('.card-audio');

    if (audio.paused) {
      document.querySelectorAll('.card-audio').forEach(a => a.pause());
      document.querySelectorAll('.back-icon.playing').forEach(b => b.classList.remove('playing'));
      audio.play();
      this.classList.add('playing');
    } else {
      audio.pause();
      this.classList.remove('playing');
    }
  });
});
