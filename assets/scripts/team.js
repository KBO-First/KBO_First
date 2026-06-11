const cards = document.querySelectorAll(".flip-card");
const audios = document.querySelectorAll(".card-audio");
const playButtons = document.querySelectorAll(".back-icons .back-icon:nth-child(2)");

/* 카드 뒤집기 */
cards.forEach(card => {
  card.addEventListener("click", (e) => {
    // 뒷면 버튼 영역을 누른 경우에는 카드를 뒤집지 않음
    if (e.target.closest(".back-icons")) return;

    card.classList.toggle("flipped");
  });
});

/* 음악 재생 / 정지 */
playButtons.forEach(btn => {
  // 페이지 로드 시점에 audio를 고정으로 바인딩 (클릭 시 DOM 탐색 X)
  const audio = btn.closest(".flip-card-back").querySelector(".card-audio");

  // 음악 종료 시 버튼 상태 초기화 (onended 덮어쓰기 대신 addEventListener 사용)
  audio.addEventListener("ended", () => {
    btn.classList.remove("playing");
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 다른 음악은 모두 정지
    audios.forEach(a => {
      if (a !== audio) {
        a.pause();
        a.currentTime = 0;
      }
    });

    // 다른 버튼 상태 초기화
    playButtons.forEach(b => {
      if (b !== btn) b.classList.remove("playing");
    });

    // 현재 음악 토글
    if (audio.paused) {
      audio.play().catch(err => console.error(err));
      btn.classList.add("playing");
    } else {
      audio.pause();
      audio.currentTime = 0;
      btn.classList.remove("playing");
    }
  });
});

/* 전체 카드 뒤집기 버튼 */
const flipAllBtn = document.getElementById("flipAllBtn");

if (flipAllBtn) {
  let allFlipped = false;

  flipAllBtn.addEventListener("click", () => {
    allFlipped = !allFlipped;

    cards.forEach(card => {
      card.classList.toggle("flipped", allFlipped);
    });

    flipAllBtn.textContent = allFlipped
      ? "↩ BACK — 앞면"
      : "↻ FLIPPED — 뒷면";
  });
}